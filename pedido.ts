
export interface EstrategiaDesconto {
  calcular(total: number): number;
}

export class DescontoComum implements EstrategiaDesconto {
  calcular(total: number): number {
    return total;
  }
}

export class DescontoVip implements EstrategiaDesconto {
  calcular(total: number): number {
    return total * 0.9;
  }
}

export class DescontoFuncionario implements EstrategiaDesconto {
  calcular(total: number): number {
    return total * 0.7;
  }
}

interface ItemPedido {
  p: number;
  q: number;
}

interface Pedido {
  itens: ItemPedido[];
  cliente?: string;
}

export class PedidoService {
  constructor(
    private estrategiaDesconto: EstrategiaDesconto
  ) {}

  calcularTotal(pedido: Pedido): number {
    const valorBruto = this.calcularValorBruto(pedido);

    return this.estrategiaDesconto.calcular(valorBruto);
  }

  private calcularValorBruto(pedido: Pedido): number {
    return pedido.itens.reduce(
      (total, item) => total + item.p * item.q,
      0
    );
  }
}

export class NotificadorPedido {
  notificarCliente(cliente: string): void {
    console.log(`Email para ${cliente}`);
  }

  notificarPedidoGrande(total: number): void {
    if (total > 500) {
      console.log("Pedido grande");
    }
  }
}
