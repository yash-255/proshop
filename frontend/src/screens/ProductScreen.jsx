import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import {useDispatch} from "react-redux";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import {addToCart} from '../slices/cartSlice'

const ProductScreen = () => {
  const { id:productId } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [qty,setQty] = useState(1);

  const {data : product, isLoading, error} = useGetProductDetailsQuery(productId);

  const addToCartHandler= () => {
    dispatch(addToCart({...product,qty}));
    navigate('/cart');

  }


  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
      <Loader/>
      ) : error ? (<Message variant='danger'>{error?.data.message || error.error}</Message>) : (
        <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroupItem>Price: ₹ {product.price}</ListGroupItem>
            <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>₹{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item style={{paddingLeft:"20px"}}>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </Col>
              </Row>
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <ListGroup.Item style={{paddingLeft:"20px"}}> 
                <Row>
                  <Col>Qty</Col>
                  <Col>
                  <Form.Control style={{width:"90px"}}
                    as='select'
                    value={qty}
                    onChange={(e)=> setQty(Number(e.target.value))}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              
                            ))}

                    
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
           
            <ListGroupItem style={{paddingLeft:"10px"}}>
              <Button className='btn-block'
              type='button' 
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}     
                  >  
                Add to Cart 
              </Button>
            </ListGroupItem>
          </Card>
        </Col>
      </Row>
      ) 
    }
      
    </>
  );
};

export default ProductScreen;
