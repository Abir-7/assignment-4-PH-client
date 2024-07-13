import AddEditProduct from "@/components/addProductModal/AddEditProduct";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks";

const ProductTable = () => {
  const { dataState } = useAppSelector((state) => state.productSlice);
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[130px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataState?.data.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">
              <img src={item.image} alt="" />
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.availability.quantity}</TableCell>
            <TableCell className="">{item.price}tk</TableCell>
            <TableCell className="">
              <div className="flex justify-center gap-2">
                <AddEditProduct id={item._id} actionText="update" />
                <AddEditProduct id={item._id} actionText="delete" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default ProductTable;
