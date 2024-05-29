import { useCallback, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { SpendingStorageDTO } from "../../spending/SpendingStorageDTO";

import {
  Container,
  Content,
  Header,
  Title
} from "./style";
import { spendingGetAll } from "../../spending/spendingGetAll";
import { useFocusEffect } from "@react-navigation/native";

export function Resume() {
  const [dataExpenses, setDataExpenses] = useState<SpendingStorageDTO[]>([]);

  async function loadDataSpending() {
    const data = await spendingGetAll();
    setDataExpenses(data);
  }

  useFocusEffect(useCallback(() => {
    loadDataSpending();
  }, []));

  
  function calculateByCategory(expenses: SpendingStorageDTO[]) {
    const totalsByCategory: Record<string, number> = {};

    expenses.forEach((expense) => {
      const { category, amount } = expense;
      if (!totalsByCategory[category]) {
        totalsByCategory[category] = amount;
      } else {
        totalsByCategory[category] += amount;
      }
    });

    return totalsByCategory;
  }

  const totalsByCategory = calculateByCategory(dataExpenses);

  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>

      <Content contentContainerStyle={{ padding: 24}}>
        {Object.entries(totalsByCategory).map(([category, amount]) => (
          amount > 0 && (
            <HistoryCard
              key={category}
              title={category}
              amount={`R$ ${amount.toFixed(2)}`}
            />
          )
        ))}
      </Content>
    </Container>
  );
}
