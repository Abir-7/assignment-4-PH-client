/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
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
const AllOrderPage = () => {
  const { data, isLoading } = useGetAllOrdersQuery("");
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <div className="h-[80vh] text-2xl flex items-center justify-center text-green-600">
          Loading...
        </div>
      ) : (
        <>
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Payment Methods</TableHead>
                <TableHead>Produc Details</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((order: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{order.name}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.orderMethods}</TableCell>
                  <TableCell>
                    {order.products.map((item: any) => (
                      <p>
                        {item.id.title} : {item.quantity},
                      </p>
                    ))}
                  </TableCell>
                  <TableCell className="">{order.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </>
      )}
    </div>
  );
};

export default AllOrderPage;
