import { ChevronDownIcon } from "@heroicons/react/outline";
import Image from "next/image";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../redux/basketSlice";
import { urlFor } from "../sanity";

interface Props {
  items: Product[];
  id: string;
}

const CheckoutProduct = ({ items, id }: Props) => {
  const dispatch = useDispatch();
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
    toast.error(`${items[0].title} removed from basket`, {
      position: "bottom-center",
    });
  };
  const basketTotal = items.reduce((total, item) => total + item.price, 0);
  const price = new Intl.NumberFormat().format(basketTotal);

  return (
    <div className="flex flex-col gap-x-4 border-b-2 border-gray-300 pb-5 lg:flex-row lg:items-center">
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
            <p className="flex items-end gap-x-1 font-semibold">
              {items.length}
              <ChevronDownIcon className="h-6 w-6 text-blue-300" />
            </p>
          </div>

          <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
            Show product details
            <ChevronDownIcon className="h-6 w-6" />
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">£{price}</h4>
          <button
            className="text-blue-500 hover:underline"
            onClick={removeItemFromBasket}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
export default CheckoutProduct;
