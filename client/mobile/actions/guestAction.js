import axios from "../services/axios";

export const GET_GUEST = token => {
  return dispatch => {
    axios
      .get("/guests", { headers: { token } })
      .then(({ data }) => {
        dispatch(fetch(data));
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

const fetch = guests => ({
  type: "fetchGuest",
  payload: { guests }
});
