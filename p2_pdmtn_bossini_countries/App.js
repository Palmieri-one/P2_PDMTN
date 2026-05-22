import React from 'react';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

export default function App() {

  const [busca, setBusca] = useState('');
  const [resultado, setResultado] = useState(null);
  const [nomeComum, setNomeComum] = useState('');
  const [nomeOficial, setNomeOficial] = useState('');
  const [nomeRussoComum, setNomeRussoComum] = useState('');
  const [nomeRussoOficial, setNomeRussoOficial] = useState('');
  const [mapa, setMapa] = useState('');
  const [bandeira, setBandeira] = useState('');
  const [tipoBusca, setTipoBusca] = useState(null);


  const buscarPorNome = async () => {
    try {
      const nome = busca;
      const resposta = await fetch(
        `https://restcountries.com/v3.1/name/${nome}`
      );
      const info = await resposta.json();
      setNomeComum(info[0].name.common);
      setNomeOficial(info[0].name.official);
      setNomeRussoComum(info[0].translations.rus.common);
      setNomeRussoOficial(info[0].translations.rus.official);
      setMapa(info[0].maps.openStreetMaps);
      setBandeira(info[0].flags?.png || '');
      setResultado(info[0]);
      setTipoBusca('nome');
    } catch (error) {
      alert(`Erro ao buscar o país: ${busca}`);
      setResultado(null);
    }
  };

  const buscaPorCapital = async () => {
    try {
      const capital = busca;
      const resposta = await fetch(
        `https://restcountries.com/v3.1/capital/${capital}`
      );
      const info = await resposta.json();
      setNomeComum(info[0].name.common);
      setNomeOficial(info[0].name.official);
      setBandeira(info[0].flags?.png || '');
      setResultado(info[0]);
      setTipoBusca('capital');
    } catch (error) {
      alert(`Erro ao buscar a capital: ${busca}`);
      setResultado(null);
    }
  };
  
  return (
    <View style={styles.container}>

      <View style={styles.quadrado}>

        <Text style={styles.titulo}>BUSCADOR DE PAÍSES</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do país ou capital"
          placeholderTextColor="#00000034"
          value={busca}
          onChangeText={setBusca}
        />

        <Pressable style={styles.botao} onPress={buscarPorNome}>
          <Text style={styles.textoBotao}>BUSCAR POR NOME DO PAÍS</Text>
        </Pressable>
        
         <Pressable style={styles.botao} onPress={buscaPorCapital}>
          <Text style={styles.textoBotao}>BUSCAR POR CAPITAL DO PAÍS</Text>
        </Pressable>

        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoTitulo}>RESULTADO DA BUSCA:
            <br/>
            {tipoBusca === 'nome' && (
              <View>
                <Text style={styles.label}>Nome Comum:</Text>
                <Text style={styles.valor}>{nomeComum}</Text>
                <Text style={styles.label}>Nome Oficial:</Text>
                <Text style={styles.valor}>{nomeOficial}</Text>
                <Text style={styles.label}>Nome Russo Comum:</Text>
                <Text style={styles.valor}>{nomeRussoComum}</Text>
                <Text style={styles.label}>Nome Russo Oficial:</Text>
                <Text style={styles.valor}>{nomeRussoOficial}</Text>
                <Text style={styles.label}>Mapa (OpenStreetMap):</Text>
                <Text style={styles.valor}>{mapa}</Text>
              </View>
            )}
            {tipoBusca === 'capital' && (
              <View>
                <Text style={styles.label}>Nome Oficial:</Text>
                <Text style={styles.valor}>{nomeOficial}</Text>
                <Text style={styles.label}>Bandeira:</Text>
                {bandeira ? (
                  <Image source={{ uri: bandeira }} style={{ width: 200, height: 100 }} />
                ) : (
                  <Text style={styles.valor}>Bandeira não disponível</Text>
                )}
              </View>
            )}
          </Text>
        </View>
        <text style={styles.creditos}>Desenvolvido por Fernando Antonio, Letícia Sudan e Mariana Fernandes</text>
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
    textAlign: 'center',
    alignItems: 'center',
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
  creditos:{
    flex: 1,
    marginTop: 70,
    textcolor: '#100014b7',
    color: '#100014b7',
    textAlign: 'center',
  }
});


