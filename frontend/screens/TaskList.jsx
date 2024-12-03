import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import api from '../api';

const API_URL = 'https://atividade-aps-2.onrender.com/';

export default function TaskList({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused(); // Hook para monitorar o foco na tela

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchTasks(); // Recarregar as tarefas quando a tela estiver em foco
    }
  }, [isFocused]);

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      // Remover visualmente antes de recarregar
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      fetchTasks(); // Opcional: garantir sincronização com o servidor
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            {item.photo && <Image source={{ uri: `${API_URL}${item.photo}` }} style={styles.image} />}
            <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Nova Tarefa" onPress={() => navigation.navigate('TaskForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  taskItem: { marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 18, fontWeight: 'bold' },
  image: { width: 100, height: 100, marginTop: 10 },
  deleteButton: { marginTop: 10, backgroundColor: 'red', padding: 5 },
  deleteText: { color: '#fff', textAlign: 'center' },
});
