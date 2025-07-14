import { useState } from 'react';

import { Button } from '@/components/Button';
import { styles } from './styles';
import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';


const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.DONE,
  FilterStatus.PENDING,
];

export function Home() {

  const [itens, setItens] = useState<any>([]);
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState('');

  function handleAdd() {
    if (!description.trim()) {
      return Alert.alert('Atenção', 'Informe a descrição para adicionar.');
    }
    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }

    setItens((prevState) => [...prevState, newItem]);
  }

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <View style={styles.form}>
        <Input
          placeholder='O que voce precisa comprar?'
          onChangeText={setDescription}
        />
        <Button title='Adicionar' onPress={handleAdd}/>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (
              <Filter
                key={status}
                status={status}
                isActive={status === filter}
                onPress={() => setFilter(status)}
              />
            ))
          }
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={[itens]}
          keyExtractor={(itens) => itens.id}
          renderItem={({ iten }) => (
            <Item
              data={itens}
              onStatus={() => { console.log('Troca status') }}
              onRemove={() => { console.log('Remove item') }}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Não há itens na lista</Text>}
        />

      </View>
    </View>
  );
}
