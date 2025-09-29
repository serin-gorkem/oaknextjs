import { useEffect, useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function GetFinalPrice(clientData: any) {
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const { convertPrice } = useCurrency();
  useEffect(() => {
    const fetchConvertedPrice = async () => {
      const basePrice = clientData?.booking?.total_price ?? clientData?.price;
      if (basePrice) {
        const converted = await convertPrice(basePrice);
        setFinalPrice(Math.round(converted));
      }
    };
    fetchConvertedPrice();
  }, [clientData?.booking?.total_price, clientData?.price, convertPrice]);

  return finalPrice;
}
