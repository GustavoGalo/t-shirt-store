/* eslint-disable @next/next/no-img-element */
"use client";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface IShirt {
  id: string;
  img: string;
  name: string;
  price: number;
  sizes: string[];
  colors: string[];
}

import mock_shirts from "../../mock.json";

export default function ShirtsPage() {
  const router = useRouter();

  const [shirts, setShirts] = useState<IShirt[]>(mock_shirts);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let temp;
    if (size && size !== "TODOS") {
      temp = mock_shirts.filter((item) => item.sizes.includes(size));
    }
    if (color && color !== "TODAS") {
      temp = (temp || mock_shirts).filter((item) =>
        item.colors.includes(color)
      );
    }
    if (search) {
      temp = (temp || mock_shirts).filter((shirt) =>
        shirt.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }
    setShirts(temp || mock_shirts);
  }, [search, size, color]);

  const handleRedirect = (shirt: IShirt) => {
    localStorage.setItem("shirt", JSON.stringify(shirt));
    router.push(`/t-shirt/${shirt.id}`);
  };

  return (
    <main className="max-w-2xl m-auto">
      <div className="my-2 flex gap-2 flex-wrap justify-center">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-80"
        />
        <Select onValueChange={setSize}>
          <SelectTrigger className="w-[90px]">
            <SelectValue placeholder="Tamanho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Todos</SelectItem>
            <SelectItem value="P">P</SelectItem>
            <SelectItem value="M">M</SelectItem>
            <SelectItem value="G">G</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setColor}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODAS">Todas</SelectItem>
            <SelectItem value="R">
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-[#ff0000] "></div> <div>#ff0000</div>
              </div>
            </SelectItem>
            <SelectItem value="G">
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-[#00ff00] "></div> <div>#00ff00</div>
              </div>
            </SelectItem>
            <SelectItem value="B">
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-[#0000ff] "></div> <div>#0000ff</div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {shirts.length > 0 ? (
          shirts.map((shirt) => (
            <Card
              key={shirt.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleRedirect(shirt)}
            >
              <CardHeader>
                <CardTitle>{shirt.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={shirt.img}
                  width={200}
                  height={200}
                  style={{ objectFit: "contain" }}
                  alt="product img"
                ></img>
              </CardContent>
              <CardFooter>
                <Button>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(shirt.price)}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="py-4">Nenhuma camiseta encontrada.</div>
        )}
      </div>
    </main>
  );
}
