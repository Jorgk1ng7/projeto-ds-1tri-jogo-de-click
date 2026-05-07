from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def teste_formulario_suporte():
    driver = None
    try:
        options = webdriver.ChromeOptions()
        options.add_argument("--start-maximized")
        options.add_argument("--ignore-certificate-errors")
        options.add_argument("--disable-blink-features=AutomationControlled")

        print("🚀 Iniciando navegador...")
        driver = webdriver.Chrome(options=options)
        
        driver.get("http://localhost:8081/suporti")
        print("📄 Página aberta. Aguardando carregamento...")
        
        time.sleep(5)   # Espera maior para React Native Web carregar

        # ==================== DEBUG TOTAL ====================
        print("\n" + "="*60)
        print("DEBUG: SALVANDO INFORMAÇÕES DA PÁGINA")
        print("="*60)
        
        # Salva o HTML para análise
        with open("pagina_html.html", "w", encoding="utf-8") as f:
            f.write(driver.page_source)
        print("📄 HTML salvo em: pagina_html.html")

        driver.save_screenshot("pagina_aberta.png")
        print("📸 Screenshot salvo: pagina_aberta.png")

        # Tenta encontrar TODOS os inputs da página
        inputs = driver.find_elements(By.TAG_NAME, "input")
        textareas = driver.find_elements(By.TAG_NAME, "textarea")
        
        print(f"\nEncontrados {len(inputs)} <input> e {len(textareas)} <textarea>")

        print("\n--- Inputs encontrados ---")
        for i, inp in enumerate(inputs):
            try:
                testid = inp.get_attribute("data-testid")
                placeholder = inp.get_attribute("placeholder")
                print(f"{i+1}: data-testid='{testid}' | placeholder='{placeholder}'")
            except:
                print(f"{i+1}: sem informações")

        print("\n--- Textareas encontradas ---")
        for i, area in enumerate(textareas):
            try:
                testid = area.get_attribute("data-testid")
                print(f"{i+1}: data-testid='{testid}'")
            except:
                print(f"{i+1}: sem testid")

        # ==================== TENTATIVA DE PREENCHIMENTO ====================
        print("\n--- Tentando preencher ---")
        
        # Tentativa 1: data-testid exato
        try:
            email = driver.find_element(By.CSS_SELECTOR, '[data-testid="email_input"]')
            email.clear()
            email.send_keys("teste@gmail.com")
            print("✅ Email preenchido (data-testid)")
        except:
            print("❌ Falhou com data-testid email_input")

        try:
            mensagem = driver.find_element(By.CSS_SELECTOR, '[data-testid="message_input"]')
            mensagem.clear()
            mensagem.send_keys("Teste automático Selenium - Mensagem enviada com sucesso.")
            print("✅ Mensagem preenchida (data-testid)")
        except:
            print("❌ Falhou com data-testid message_input")

        # Tentativa 2: Por placeholder
        try:
            email = driver.find_element(By.CSS_SELECTOR, 'input[placeholder*="Email"], input[placeholder*="email"]')
            email.clear()
            email.send_keys("teste@gmail.com")
            print("✅ Email preenchido pelo placeholder")
        except:
            pass

        try:
            mensagem = driver.find_element(By.TAG_NAME, "textarea")
            mensagem.clear()
            mensagem.send_keys("Teste automático Selenium - Mensagem enviada com sucesso.")
            print("✅ Mensagem preenchida via <textarea>")
        except:
            pass

        # Clique no botão
        try:
            botao = driver.find_element(By.CSS_SELECTOR, 'button, [data-testid="button"]')
            botao.click()
            print("✅ Botão clicado")
        except:
            print("❌ Não encontrou botão")

        time.sleep(4)
        driver.save_screenshot("resultado_final.png")

    except Exception as e:
        print(f"\n❌ ERRO: {e}")
    finally:
        if driver:
            time.sleep(3)
            driver.quit()
            print("🔒 Navegador fechado.")


if __name__ == "__main__":
    teste_formulario_suporte()