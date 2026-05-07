import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import (
    StaleElementReferenceException,
    TimeoutException
)

def test_click_and_rebirth():

    driver = webdriver.Chrome()
    driver.maximize_window()

    wait = WebDriverWait(driver, 10)

    try:
        driver.get("http://localhost:8081/explore")

        print("Página carregada!")

        inicio = time.time()

      
        print("Iniciando 1000 cliques...")

        for i in range(1001):

            try:
                capivara = wait.until(
                    EC.presence_of_element_located(
                        (By.CSS_SELECTOR, '[data-testid="capivara-button"]')
                    )
                )

                driver.execute_script(
                    "arguments[0].click();",
                    capivara
                )

                if i % 100 == 0:
                    print(f"{i} cliques realizados")

                time.sleep(0.01)

            except StaleElementReferenceException:
                print("Elemento atualizado pelo React...")
                continue

        print("1001 cliques concluídos!")

        
        time.sleep(3)

      
        print("Tentando realizar rebirth...")

        rebirth_button = wait.until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, '[data-testid="rebirth-button"]')
            )
        )

        driver.execute_script(
            "arguments[0].click();",
            rebirth_button
        )

        print("Rebirth realizado!")

       
        driver.save_screenshot("rebirth_sucesso.png")
        print("Screenshot salva!")

        fim = time.time()

        tempo_total = fim - inicio

        print(f"\nTempo total: {tempo_total:.2f} segundos")

    except TimeoutException:
        print("O botão de rebirth não apareceu a tempo.")
        driver.save_screenshot("erro_timeout.png")

    except Exception as e:
        print("Erro:", e)
        driver.save_screenshot("erro.png")
        raise

    finally:
        driver.quit()

if __name__ == "__main__":
    test_click_and_rebirth()