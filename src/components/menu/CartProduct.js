import Image from "next/image";
import Delete from "../icons/Delete";

export default function CartProduct({product,onRemove,index}) {
  return (
    <div  className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt={''} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">
          {product.name}
        </h3>
      </div>
      <div className="text-lg font-semibold">
        ${product.price}
      </div>
      {onRemove && (
        <div className="ml-2">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-2">
            <Delete />
          </button>
        </div>
      )}
    </div>
  );
}