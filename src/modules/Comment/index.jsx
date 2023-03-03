import React, {useState, useEffect} from 'react';
import styles from './index.module.css';
import {Button} from '@/components'
import {baseUrl} from "@/assets/constants";

const Comment = (props) => {
    const {entityId} = props
    const [comments, setComments] = useState([])

    useEffect(() => {
        if (entityId) getComments()
    }, [entityId])

    const getComments = () => {
        fetch(`${baseUrl}/comment?entityType=3&entityId=${entityId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.commentHeader}>
                <h3>评论</h3>
            </div>
            <div>
                {comments.length == 0 && <div className={styles.empty}>
                    <div>暂无评论……</div>
                    <Button style={{marginTop:'1.5rem'}}>现在评论</Button>
                </div>}
            </div>
        </div>
    )
}
export default Comment