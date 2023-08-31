
import CardItem from "../../../../components/CardItem/CardItem";
import ButtonDefault from "../../../../components/UI/btns/Button/Button";
import classes from "./PaymentData.module.scss";
import React from 'react';

function PaymentData({ }) {



    return (
        <div className={classes.payments}>
            <div>
                <h2>Платежные данные</h2>
                <div className={classes.payments_cards}>
                    <CardItem />
                    <CardItem />
                    <CardItem />
                </div>
            </div>
            <div className={classes.btn_wrp}>
                <ButtonDefault title={"Добавить карту"} />
            </div>
        </div>
    )
}

export default PaymentData