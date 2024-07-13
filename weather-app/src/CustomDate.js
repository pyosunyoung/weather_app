import React from 'react';

const CustomDate = () => {

const today = new Date();
// 현재 날짜를 가져옵니다.

const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
// 원하는 형식으로 날짜를 설정합니다.

    return (
        <div>
            📆{formattedDate}
        </div>
    );
}

export default CustomDate;