const addItem = () => {
    axios.post("http://localhost:5000/api/cart/add")
          .then(response => {
            setAddCart(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the categories!', error);
          });
}