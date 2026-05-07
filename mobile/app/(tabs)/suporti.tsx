import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

// Importe sua imagem
import BackgroundImage from "../../assets/images/download.png"; // ajuste o caminho conforme a sua estrutura

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
        'https://formspree.io/f/xbdqqjrd',
        { email, message },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        setSuccess(true);
        setEmail('');
        setMessage('');
      } else {
        setError('Algo deu errado. Tente novamente mais tarde.');
      }
    } catch (err) {
      setError('Falha ao enviar a mensagem. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

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
  testID="email_input"
  style={styles.input}
  placeholder="Seu Email"
  keyboardType="email-address"
  value={email}
  onChangeText={setEmail}
/>

<Text style={styles.label}>
  Escreva Sua Mensagem
</Text>

<TextInput
  testID="message_input"
  style={styles.textarea}
  placeholder="Sua Mensagem"
  multiline
  numberOfLines={4}
  value={message}
  onChangeText={setMessage}
/>

{error && (
  <Text
    testID="error-message"
    style={styles.errorMessage}
  >
    {error}
  </Text>
)}

{success && (
  <Text
    testID="success-message"
    style={styles.successMessage}
  >
    Obrigado por entrar em contato!
  </Text>
)}

<View testID="submit-button">
  <Button
  testID="button"
    title={loading ? 'Enviando...' : 'Enviar'}
    onPress={handleSubmit}
    disabled={loading}
  />
</View>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)', // transparente
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.3)', 
    color: '#000',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#000',
    height: 100,
  },
  successMessage: {
    fontSize: 16,
    color: 'lightgreen',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});