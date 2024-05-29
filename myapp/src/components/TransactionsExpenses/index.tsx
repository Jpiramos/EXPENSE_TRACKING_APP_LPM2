import { SpendingStorageDTO }
  from "../../spending/SpendingStorageDTO";
import { convertDateToString } from "../../utils/convertDateToString";
import {
  Container,
  Description,
  Amount,
  Local,
  Footer,
  Category,
  Date,
} from "./styles";

type Props = {
  data: SpendingStorageDTO
}

export function TransactionExpenses({ data }: Props) {
  return (
    <Container>
      <Description>{data.name}</Description>
      <Amount>{data.amount.toFixed(2)}</Amount>
      <Local>{data.local}</Local>

      <Footer>
        <Category>{data.category[0].toUpperCase()+data.category.substring(1)}</Category>
        <Date>{convertDateToString(data.datePurchase)}</Date>
      </Footer>

    </Container>
  )
}