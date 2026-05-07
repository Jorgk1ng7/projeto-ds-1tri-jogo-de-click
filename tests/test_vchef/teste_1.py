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
        
        print("🚀 Iniciando navegador...")
        driver = webdriver.Chrome(options=options)
        
        wait = WebDriverWait(driver, 20)
        
        driver.get("http://localhost:8081/suporti")
        print("📄 Página aberta")
        
        time.sleep(3)  # espera inicial importante
        
        # ==================== DEBUG: MOSTRA O HTML ====================
        print("\n--- DEBUG: Procurando elementos ---")
        
        # Tenta vários jeitos de encontrar o campo de email
        email_input = None
        try:
            email_input = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="email_input"]'))
            )
            print("✅ Encontrado email_input pelo data-testid")
        except:
            print("❌ Não encontrou pelo data-testid=email_input")
            
            # Alternativas:
            try:
                email_input = driver.find_element(By.CSS_SELECTOR, 'input[placeholder*="Email"]')
                print("✅ Encontrado pelo placeholder")
            except:
                print("❌ Não encontrou pelo placeholder")
        
        # Tenta encontrar campo de mensagem
        message_input = None
        try:
            message_input = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="message_input"]'))
            )
            print("✅ Encontrado message_input pelo data-testid")
        except:
            print("❌ Não encontrou message_input")
            
            try:
                message_input = driver.find_element(By.CSS_SELECTOR, 'textarea, input[multiline]')
                print("✅ Encontrado campo de mensagem alternativo")
            except:
                print("❌ Não encontrou campo de mensagem")
        
        # Preenche se encontrou
        if email_input:
            email_input.clear()
            email_input.send_keys("teste.automatico@gmail.com")
            print("✅ Email preenchido")
        
        if message_input:
            message_input.clear()
            message_input.send_keys("Teste automático Selenium - Verificando formulário de suporte.")
            print("✅ Mensagem preenchida")
        
        # Botão enviar
        try:
            submit_button = wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="submit-button"]'))
            )
            submit_button.click()
            print("✅ Botão Enviar clicado")
        except:
            print("❌ Não conseguiu clicar no botão")
        
        # Verifica sucesso
        time.sleep(4)
        driver.save_screenshot("resultado_teste_suporte.png")
        print("📸 Screenshot salvo: resultado_teste_suporte.png")
        
    except Exception as e:
        print(f"\n❌ ERRO GERAL: {e}")
        if driver:
            driver.save_screenshot("erro_suporte.png")
    
    finally:
        if driver:
            time.sleep(3)
            driver.quit()
            print("🔒 Navegador fechado.")


if __name__ == "__main__":
    teste_formulario_suporte()