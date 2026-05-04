import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_click_one_million_times():
    # Inicia o navegador
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 10)

    try:
        driver.get("http://localhost:8081/explore")  # Acesse a página desejada (alterado para /explore)
        
        # Definir o XPath do botão (ajuste conforme necessário)
        botao_xpath = "//*[contains(text(), 'entrar')] | //*[contains(text(), 'ENTRAR')] | //*[@id='botao-entrar']"
        
        # Aguardar até que o botão esteja clicável
        botao_entrar = wait.until(EC.element_to_be_clickable((By.XPATH, botao_xpath)))

        # Iniciar o teste de cliques
        print("Iniciando o clique de 1 milhão de vezes...")
        start_time = time.time()  # Começar a medir o tempo de execução

        # Para garantir que o script não falhe, vamos clicar em 1 milhão de vezes
        for i in range(1_000_000):
            try:
                driver.execute_script("arguments[0].click();", botao_entrar)
                
                # Atraso mínimo entre os cliques (simula cliques rápidos)
                time.sleep(0.00001)  # Ajuste o valor conforme necessário para evitar falhas

                # A cada 10.000 cliques, mostramos o progresso
                if i % 10000 == 0:
                    print(f"Progresso: {i} cliques")

            except Exception as e:
                # Caso haja algum erro, vamos capturá-lo e imprimir uma mensagem
                print(f"Erro ao tentar clicar no botão: {e}")
                break

        # Calcular o tempo total de execução
        end_time = time.time()
        total_time = end_time - start_time
        print(f"Teste concluído! 1 milhão de cliques feitos em {total_time:.2f} segundos.")

        # Tirar uma captura de tela ao final do teste
        driver.save_screenshot("teste_1_milhao_cliques.png")

    except Exception as e:
        print(f"Erro durante o teste: {e}")
        driver.save_screenshot("erro_teste.png")
        raise e

    finally:
        # Fechar o navegador após o teste
        driver.quit()

if __name__ == "__main__":
    test_click_one_million_times()