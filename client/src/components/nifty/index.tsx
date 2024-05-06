import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { BaseAxios } from "@/utils/axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NiftyData } from "./types";

export function Nifty() {
  const [niftyData, setNiftyData] = useState<NiftyData | null>();
  const { toast } = useToast();

  async function getNiftyData() {
    try {
      const query = await BaseAxios.get("/api/v1/nifty");
      console.log("Nifty Data", query?.data?.data);
      setNiftyData(query?.data?.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title:
            "Uh oh! Something went wrong." +
            ` (Error: ${error?.response?.status})`,
          description: `${error.response?.data?.message}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
        });
      }
    }
  }
  useEffect(() => {
    getNiftyData();
  }, []);
  return (
    <div className="p-3">
      <Table>
        <TableCaption>A list of recent NIFTY 50 Data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Symbol</TableHead>
            <TableHead>Open</TableHead>
            <TableHead>High</TableHead>
            <TableHead>Low</TableHead>
            <TableHead>Volume (shares)</TableHead>
            <TableHead>Value (in ₹ Crores)</TableHead>
            <TableHead>Today</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {niftyData?.data.map((stock, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.open}</TableCell>
                <TableCell>{stock.dayHigh}</TableCell>
                <TableCell>{stock.dayLow}</TableCell>
                <TableCell>{stock.totalTradedVolume}</TableCell>
                <TableCell>
                  {(stock.totalTradedValue / 10000000).toFixed(2)}
                </TableCell>
                <TableCell>
                  <img src={stock.chartTodayPath} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
