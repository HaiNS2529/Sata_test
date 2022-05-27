import axios from "axios";

export default {
  Baseurl: "https://jsonplaceholder.typicode.com/posts",
  getData() {
    let url = this.Baseurl;
    console.log(url);
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log("error: ", error);
          reject(error);
        });
    });
  },

  postData(data) {
    let url = this.Baseurl;
    console.log(url);
    return new Promise((resolve, reject) => {
      axios
        .post(url,data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log("error: ", error);
          reject(error);
        });
    });
  },
};
