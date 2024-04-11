/* eslint-disable @next/next/no-img-element */
/**
 * 
  Tela de Detalhes: Ao clicar em um produto, os usuários devem ser levados a uma tela de detalhes com mais informações sobre a camiseta escolhida. 
                    Não é necessário implementar funcionalidades de carrinho de compras ou lista de favoritos para este teste.
 */
"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import mock_shirts from "../../../mock.json";

export default function TShirtPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [sizeSelected, setSizeSelected] = useState("");
  const [colorSelected, setColorSelected] = useState("");

  const shirt = mock_shirts.find((shirt) => shirt.id === params.id);

  if (!shirt) {
    return (
      <main className="max-w-2xl m-auto">
        <div>Camisa não encontrada</div>
      </main>
    );
  }

  const colors: Record<string, any> = {
    R: {
      color: "#ff0000",
      name: "Vermelho",
    },
    G: {
      color: "#00ff00",
      name: "Verde",
    },
    B: {
      color: "#0000ff",
      name: "Azul",
    },
  };

  return (
    <main className="grid place-content-center h-[100vh]">
      <Card className="flex md:flex-row flex-col p-4 justify-center items-center gap-4">
        <div className="md:w-[50%]">
          <div>
            <img
              src={shirt.img}
              width={"100%"}
              height={200}
              style={{ objectFit: "contain" }}
              alt="product img"
            ></img>
          </div>
        </div>
        <div className="md-w-[50%] h-500 flex flex-col">
          <h1 className="text-3xl font-bold">{shirt.name}</h1>
          <p>Tamanhos: </p>
          <div className="my-4 flex gap-3">
            {shirt.sizes.map((size) => (
              <Button
                variant={sizeSelected === size ? "default" : "outline"}
                key={size}
                onClick={() => setSizeSelected(size)}
              >
                {size}
              </Button>
            ))}
          </div>
          <p>Cores: </p>
          <div className="my-4 flex gap-3">
            {shirt.colors.map((color) => (
              <Button
                variant={colorSelected === color ? "default" : "outline"}
                key={color}
                onClick={() => setColorSelected(color)}
              >
                {Object.keys(colors).includes(color) && (
                  <div className="flex items-center justify-center gap-1">
                    <div
                      className={`w-3 h-3 bg-[${colors[color].color}]`}
                    ></div>
                    <span>{colors[color].name}</span>
                  </div>
                )}
              </Button>
            ))}
          </div>
          <p className="mt-4 text-[#333]">compre agora por:</p>
          <p className="text-[#00ff00] font-bold text-5xl">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(shirt.price)}
          </p>
          <Button
            onClick={() => router.push("/t-shirt")}
            className="mt-4 w-full"
          >
            Comprar
          </Button>
        </div>
      </Card>
    </main>
  );
}
