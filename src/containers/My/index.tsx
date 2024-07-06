import { useState, useEffect } from 'react';

import style from './index.module.less';

/**
 *
 */
const MY = ({}) => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    return <div className={style.container}>sss</div>;
};

export default MY;
