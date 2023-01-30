import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  function handleDelete(id) {
    const temp = JSON.parse(localStorage.getItem('token'));
    const token = temp.token;
    axios.delete(`http://localhost:3001/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res);
      // remove the deleted product from the products state
      setProducts(products.filter(product => product.elementId !== id));
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = JSON.parse(localStorage.getItem("token"));
        const token = temp.token;
        const res = await axios.get("http://localhost:3001/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data);
        console.log(products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.properties.elementId}>
              <td>{index + 1}</td>
              <td>{product.properties.name}</td>
              <td>{product.properties.description}</td>
              <td>{product.properties.price}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigate(`/productForm/${product.elementId}`);
                  }}
                >
                  Update
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product.elementId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
