import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/FormatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Item } from "../interfaces/ItemType";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../auth/TokenManager";
import { setFavorites } from "../services/apiServices";
import toast from "react-hot-toast";

interface StoreItemProp extends Item {}

const StoreItem = ({
  _id,
  name,
  price,
  photo,
  slug,
  favorites,
}: StoreItemProp) => {
  const navigate = useNavigate();
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(_id as string);
  const [isRedHeart, setIsRedHeart] = useState(false);

  useEffect(() => {
    const ifCardIsFavorite = (userId: string | null | undefined) => {
      favorites?.forEach((id) => {
        if (id === userId) {
          setIsRedHeart(true);
        }
      });
    };

    const userObject = getUser();

    if (userObject) {
      ifCardIsFavorite(userObject._id);
    }
  }, [favorites]);

  async function handleSetFavs(id: string) {
    await setFavorites(id).then((json) => {
      json.success
        ? toast.success(`${json.name} Item added to favorites`)
        : toast.success(`${json.name} Item removed from favorites`);
    });
  }

  const toggleRed = () => {
    setIsRedHeart(!isRedHeart);
  };

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={photo}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name?.substring(0, 15)}</span>
          <span className="ms-2 text-muted">
            {formatCurrency(price as number)}
          </span>
        </Card.Title>
        <div className="mb-3">
          <Button
            variant="light"
            onClick={() => {
              handleSetFavs(_id as string);
              toggleRed();
              toast.success(`${name} added to favorites`)
            }}
          >
            <i
              className="bi bi-heart-fill"
              style={{ color: isRedHeart ? "red" : "" }}
            />
          </Button>
        </div>
        <div className="mt-auto">
          {quantity < 1 ? (
            <Button
              className="w-100"
              onClick={() => {
                increaseCartQuantity(_id as string);
                toast.success(`${name} added to cart`);
              }}
            >
              + Add to cart
            </Button>
          ) : (
            <div
              className="d-flex flex-column align-items-center "
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(_id as string)}>
                  -
                </Button>
                <div>
                  <span className="fs-3 me-1">{quantity}</span>
                  in cart
                </div>
                <Button onClick={() => increaseCartQuantity(_id as string)}>
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(_id as string)}
              >
                Remove from cart
              </Button>
            </div>
          )}
          <Button
            variant="outline-primary"
            className="mt-3 w-100"
            onClick={() => navigate(`/product/${slug}`)}
          >
            See detials
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
