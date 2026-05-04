import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_click_and_rebirth():
    # Inicia o navegador
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 10)

    try:
        driver.get("http://localhost:8081/explore")  # Acesse a página desejada
        
        # Definir o XPath do botão de cliques
        botao_xpath = "//*[contains(text(), 'entrar')] | //*[contains(text(), 'ENTRAR')] | //*[@id='botao-entrar']"
        
        # Aguardar até que o botão esteja clicável
        botao_entrar = wait.until(EC.element_to_be_clickable((By.XPATH, botao_xpath)))

        # Realizar 1000 cliques
        print("Iniciando o clique de 1000 vezes...")
        for i in range(1000):
            driver.execute_script("arguments[0].click();", botao_entrar)
            time.sleep(0.01)  # Pequeno atraso entre os cliques para evitar travamentos

            # Exibe o progresso a cada 100 cliques
            if i % 100 == 0:
                print(f"Progresso: {i} cliques")

        # Agora, clicar no botão de "rebirth"
        rebirth_xpath = "//*[contains(text(), 'Renascimento')] | //*[@id='botao-renascimento']"  # Ajuste o XPath conforme necessário
        rebirth_button = wait.until(EC.element_to_be_clickable((By.XPATH, rebirth_xpath)))
        
        print("Clicando para realizar o rebirth...")
        rebirth_button.click()  # Clica no botão de rebirth
        
        # Tirar uma captura de tela após o rebirth
        driver.save_screenshot("rebirth_sucesso.png")
        print("Rebirth realizado e captura de tela salva.")

    except Exception as e:
        print(f"Erro durante o teste: {e}")
        driver.save_screenshot("erro_teste_rebirth.png")
        raise e

    finally:
        # Fechar o navegador após o teste
        driver.quit()

if __name__ == "__main__":
    test_click_and_rebirth()