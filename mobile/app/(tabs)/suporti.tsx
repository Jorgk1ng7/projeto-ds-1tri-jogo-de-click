import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

// Importe sua imagem
import BackgroundImage from "../../assets/images/ribbon-minimalist-black-phone.jpg"; // ajuste o caminho conforme a sua estrutura

function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await axios.post(
        'https://formspree.io/f/xvzvndgw',
        { email, message },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        setSuccess(true);
        setEmail(''); // limpa o input
        setMessage(''); // limpa a mensagem
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Faz a mensagem de sucesso desaparecer após 5 segundos
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <ImageBackground source={BackgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.label}>Coloque Seu Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Escreva Sua Mensagem</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Sua Mensagem"
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />

        {error && <Text style={styles.errorMessage}>{error}</Text>}
        {success && <Text style={styles.successMessage}>Obrigado por entrar em contato!</Text>}

        <Button
          title={loading ? 'Submitting...' : 'Submit'}
          onPress={handleSubmit}
          disabled={loading}
        />
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return <ContactForm />;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)', // Transparência para ver o fundo
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff', // Melhor visibilidade sobre o fundo
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.8)', // Leve fundo para destacar
  },
  textarea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});