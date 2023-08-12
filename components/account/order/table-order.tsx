import ListProduct from "./list-product";

const TableOrder = () => {
  return (
    <div className="w-full mx-auto rounded-sm">
      <header className="py-4 0">
        <h2 className="font-medium text-[#242424] text-2xl mt-10 md:mt:0">
          Order History
        </h2>
      </header>
      <div className="">
        <ul role="list" className="">
          <ListProduct products={[]}/>
        </ul>
      </div>
    </div>
  );
};

export default TableOrder;
