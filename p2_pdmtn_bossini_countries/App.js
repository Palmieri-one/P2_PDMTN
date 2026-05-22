import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

export default function App() {

  const [pais, setPais] = useState('');
  const [resultado, setResultado] = useState(null);
  const [nomeComum, setNomeComum] = useState('');
  const [nomeOficial, setNomeOficial] = useState('');
  const [nomeRussoComum, setNomeRussoComum] = useState('');
  const [nomeRussoOficial, setNomeRussoOficial] = useState('');
  const [mapa, setMapa] = useState('');
  const [bandeira, setBandeira] = useState('');

  const buscarPorNome = async () => {
    try {
      const nome = pais;
      const resposta = await fetch(
        `https://restcountries.com/v3.1/name/${nome}`
      );
      const info = await resposta.json();
      setNomeComum(info[0].name.common);
      setNomeOficial(info[0].name.official);
      setNomeRussoComum(info[0].translations.rus.common);
      setNomeRussoOficial(info[0].translations.rus.official);
      setMapa(info[0].maps.openStreetMaps);
      setResultado(info[0]);
      console.log(info[0]);
    } catch (error) {
      console.error('Erro ao buscar país:', error);
      setResultado(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.quadrado}>
        <Text style={styles.titulo}>BUSCADOR DE PAÍSES</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do país"
          placeholderTextColor="#00000034"
          value={pais}
          onChangeText={setPais}
        />
        <Pressable style={styles.botao} onPress={buscarPorNome}>
          <Text style={styles.textoBotao}>BUSCAR POR NOME DO PAIS</Text>
        </Pressable>
        <View style={styles.resultadoContainer}>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quadrado: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#1e293b33',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
  },

  titulo: {
    color: '#100014b7',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    width: '100%',
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000000',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botao: {
    backgroundColor: '#4b65f5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },

  textoBotao: {
    color: '#100014b7',
    fontWeight: 'bold',
    fontSize: 20,
  },

  resultadoContainer: {
    textAlign: 'top',
    itemsAlign: 'center',
    marginTop: 30,
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },

  resultadoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#100014b7',
    marginBottom: 15,
    textAlign: 'center',
  },

  infoBox: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },

  valor: {
    fontSize: 14,
    color: '#666666',
  },

  link: {
    fontSize: 12,
    color: '#0066cc',
  },
});


