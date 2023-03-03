import React, {useEffect, useState} from "react";
import {baseUrl} from "@/assets/constants";
import styles from "./index.module.css";
import pubsub from "pubsub.js";
import Header from "../Header/";
import {Button} from '../../components/'
import * as Checkbox from '@radix-ui/react-checkbox';
import {CheckIcon} from '@radix-ui/react-icons';

const CarModule = () => {
    const [carList, setCarList] = useState([]);
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        pubsub.subscribe("updateCar", getCarList());
    }, []);

    const getCarList = () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const url = `${baseUrl}/shopcar?userId=${userInfo.userId}`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setCarList(res.msg);
            }).catch(err => {
            console.warn(err)
        });
    };

    const handleChoose = (id) => {
        console.log(id, selected.includes(id))
        let tempData = [...selected]
        if (selected.includes(id)) {
            let index = selected.indexOf(id)
            tempData.splice(index, 1)
        } else tempData.push(id)
        console.log(tempData)
        setSelected(tempData)
    }
    return (
        <>
            <Header/>
            <div className={styles.car}>
                <div className={styles.carHeader}>
                    <div>购物车</div>
                    <Button disabled={selected.length == 0} className={styles.payBtn}>结算</Button>
                </div>
                <div className={styles.carList}>
                    {carList.length > 0 && carList.map((item, index) => {
                        return (
                            <div className={styles.carItem} key={item.shopCar.shopCarId}>
                                <input className={styles.checkbox} type="checkbox" value={selected.includes(item.shopCar.shopCarId)}
                                       onClick={() => handleChoose(item.shopCar.shopCarId)}/>
                                <div className={styles.carItemPic}>
                                    <img className={styles.carItemImg} src={item.product.pictureLink}
                                         alt={item.product.productName}/></div>
                                <div className={styles.carItemDetail}>
                                    <h3 style={{textTransform: 'uppercase'}}> {item.product.productName}</h3>
                                    <div className={styles.tag}> {item.product.type}</div>
                                    <div className={styles.price}>¥ {item.product.productPrice}</div>
                                    <div className={styles.count}>x {item.shopCar.size}</div>
                                    <Button className={styles.patBtns}>结算</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
        ;
};

export default CarModule;

