import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException

def test_click_capivara():

    driver = webdriver.Chrome()
    driver.maximize_window()

    wait = WebDriverWait(driver, 10)

    try:
        driver.get("http://localhost:8081/explore")

        print("Página carregada!")

        # inicia cronômetro
        inicio = time.time()

        for i in range(1000):

            try:
                # procura novamente o elemento
                capivara = wait.until(
                    EC.presence_of_element_located(
                        (By.CSS_SELECTOR, '[data-testid="capivara-button"]')
                    )
                )

                # realiza o clique
                driver.execute_script(
                    "arguments[0].click();",
                    capivara
                )

                # progresso
                if i % 100 == 0:
                    print(f"{i} cliques realizados")

                time.sleep(0.01)

            except StaleElementReferenceException:
                print("Elemento atualizado pelo React, tentando novamente...")
                continue

        # finaliza cronômetro
        fim = time.time()

        tempo_total = fim - inicio

        print("\nTeste concluído!")
        print(f"Tempo total: {tempo_total:.2f} segundos")

        driver.save_screenshot("teste_sucesso.png")

    except Exception as e:
        print("Erro:", e)
        driver.save_screenshot("erro.png")
        raise

    finally:
        driver.quit()

if __name__ == "__main__":
    test_click_capivara()