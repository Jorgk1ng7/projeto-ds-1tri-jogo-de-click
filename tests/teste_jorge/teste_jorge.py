import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException

def test_login_campos_vazios():
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 20)

    try:
        # Abrir a página do sistema
        driver.get("http://localhost:8081")

        # Interagir com o campo de email
        email_xpath = "//input[@placeholder='Email'] | //*[@id='input-email']"
        campo_email = wait_until_element_visible(wait, email_xpath)
        campo_email.clear()
        campo_email.send_keys("")  # Deixar o campo de email vazio

        # Interagir com o campo de senha
        senha_xpath = "//input[@placeholder='Senha'] | //*[@id='input-senha']"
        campo_senha = wait_until_element_visible(wait, senha_xpath)
        campo_senha.clear()
        campo_senha.send_keys("")  # Deixar o campo de senha vazio

        # Clicar no botão de login
        botao_xpath = "//*[contains(text(), 'entrar')] | //*[contains(text(), 'ENTRAR')] | //*[@id='botao-entrar']"
        botao_entrar = wait_until_element_clickable(wait, botao_xpath)
        driver.execute_script("arguments[0].click();", botao_entrar)

        # Verificar se a mensagem de erro de campo obrigatório é exibida
        erro_xpath = "//*[contains(text(), 'campos obrigatórios')] | //*[contains(text(), 'obrigatório')] | //*[contains(text(), 'Preencha')]"
        mensagem_erro = wait.until(EC.presence_of_element_located((By.XPATH, erro_xpath)))

        # Verificar se a mensagem de erro está visível
        assert mensagem_erro.is_displayed()
        print("Sucesso: O sistema bloqueou o login e exibiu a mensagem de campo obrigatório.")

        # Tirar uma captura de tela após o teste bem-sucedido
        driver.save_screenshot("login_campos_vazios_sucesso.png")

    except Exception as e:
        # Caso ocorra uma exceção, tirar a captura de tela do erro
        driver.save_screenshot("erro_teste_invalido.png")
        print(f"Erro: {e}")
        raise e

    finally:
        # Fechar o navegador após o teste
        driver.quit()

# Função para aguardar até que um elemento seja visível
def wait_until_element_visible(wait, xpath):
    for _ in range(10):
        try:
            return wait.until(EC.visibility_of_element_located((By.XPATH, xpath)))
        except StaleElementReferenceException:
            time.sleep(0.5)
    raise Exception(f"Elemento não encontrado: {xpath}")

# Função para aguardar até que um elemento seja clicável
def wait_until_element_clickable(wait, xpath):
    for _ in range(10):
        try:
            return wait.until(EC.element_to_be_clickable((By.XPATH, xpath)))
        except StaleElementReferenceException:
            time.sleep(0.5)
    raise Exception(f"Elemento não encontrado ou não clicável: {xpath}")

# Rodar o teste
if __name__ == "__main__":
    test_login_campos_vazios()