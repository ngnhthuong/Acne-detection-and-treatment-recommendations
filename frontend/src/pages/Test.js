import React from "react";
import "./test.css";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  increaseCounter,
  decreaseCounter,
  devideCounter,
  FetchUsers,
} from "../action/actions";

const Test = (props) => {
  const count = useSelector((state) => state.counter.count);
  const devide = useSelector((state) => state.devide.devide);
  const users = useSelector((state) => state.user.list_user);
  const dispatch = useDispatch();
  const handleIncrease = () => {
    dispatch(increaseCounter(2))
  };

  useEffect(() => {
    dispatch(FetchUsers());
  },[]);

  useEffect(() => {
    console.log("users", users);
  }, [users]);

  return (
    <div className="Middle">
      <h1>Test</h1>
      <div>
        Count: {count} {devide}
      </div>
      {
        users && <div>{users.name}</div>
      }
      <button onClick={() => dispatch(devideCounter())}>Devide</button>
      <button onClick={() => handleIncrease(2)}>Increate</button>
      <button onClick={() => dispatch(decreaseCounter())}>Decreate</button>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     count: state.counter.count,
//     devide: state.devide.devide,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     devideCounter: () => dispatch(devideCounter()),
//     increaseCounter: () => dispatch(increaseCounter()),
//     decreaseCounter: () => dispatch(decreaseCounter()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Test);
export default Test;
