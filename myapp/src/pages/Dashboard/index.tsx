import React, { useState } from 'react';
import { Alert, ScrollView, Modal, View, Text, TouchableOpacity } from 'react-native';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Container } from './styles';
import { InputAmount } from '../../components/InputAmount';
import { InputDate } from '../../components/InputDate';
import { convertDate } from '../../utils/convertDate';
import { formatAmount } from '../../utils/formatAmount';
import { spendingCreate } from '../../spending/spendingCreate';
import { spendingGetAll } from '../../spending/spendingGetAll';

export function Dashboard() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [datePurchase, setDatePurchase] = useState('');
  const [category, setCategory] = useState('');
  const [local, setLocal] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const categories = [
    { label: 'Lazer', value: 'Lazer' },
    { label: 'Estudos', value: 'Estudos' },
    { label: 'Alimentação', value: 'Alimentação' },
    { label: 'Carro', value: 'Carro' },
    { label: 'Vestuário', value: 'Vestuário' },
    { label: 'Utensílios', value: 'Utensílios' },
  ];

  async function handleAddNewSpending() {
    if (name === '' || amount === '' || datePurchase === '' || category === '' || local === '') {
      return Alert.alert('Atenção', 'Favor preencher todos os campos!!!');
    }

    if (amount === 'R$0,00') {
      return Alert.alert('Atenção', 'O valor não pode ser R$ 0,00');
    }

    const data = {
      name,
      amount: formatAmount(amount),
      datePurchase: convertDate(datePurchase),
      category,
      local,
    };

    setName('');
    setAmount('');
    setDatePurchase('');
    setCategory('');
    setLocal('');

    await spendingCreate(data);
    const result = await spendingGetAll();
    console.log(result);
  }

  return (
    <Container>
      <Header title="Controle de Gastos" />

      <ScrollView>
        <Input
          placeholder="Descrição"
          placeholderTextColor="#363F5F"
          value={name}
          onChangeText={(value) => setName(value)}
        />

        <InputAmount
          placeholder="Valor"
          placeholderTextColor="#363F5F"
          value={amount}
          onChangeText={(value) => setAmount(value)}
        />

        <InputDate
          placeholder="Data Compra"
          placeholderTextColor="#363F5F"
          value={datePurchase}
          onChangeText={(value) => setDatePurchase(value)}
        />

        <TouchableOpacity onPress={() => setShowCategoryModal(true)}>
          <Input
            placeholder="Categoria"
            placeholderTextColor="#363F5F"
            value={category}
            editable={false}
            style={category ? { color: '#000' } : { color: '#363F5F' }} // Change text color based on category value
          />
        </TouchableOpacity>

        <Input
          placeholder="Local da Compra"
          placeholderTextColor="#363F5F"
          value={local}
          onChangeText={(value) => setLocal(value)}
        />
      </ScrollView>

      <Modal visible={showCategoryModal} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#363F5F' }}>Selecione uma categoria</Text>
            <ScrollView style={{ maxHeight: 200 }}>
              {categories.map((cat) => (
                <TouchableOpacity key={cat.value} onPress={() => { setCategory(cat.value); setShowCategoryModal(false); }}>
                  <Text style={{ fontSize: 16, marginBottom: 10, color: '#363F5F' }}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Button title="Adicionar" onPress={handleAddNewSpending} />
    </Container>
  );
}
