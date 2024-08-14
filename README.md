1. **Configurando o Git**
   - **Nome e Email**: Antes de começar, configure seu nome de usuário e email no Git. Eles serão usados para identificar suas contribuições.

   ```bash
   git config --global user.name "Seu Nome"
   git config --global user.email "seuemail@example.com"
   ```

2. **Clonando o Repositório**
   - Se você for colaborar em um projeto existente, o primeiro passo é clonar o repositório para sua máquina local.

   ```bash
   git clone https://github.com/usuario/repo.git
   ```

   - Isso cria uma cópia local do repositório em seu computador.

3. **Criando uma Nova Branch**
   - Para evitar conflitos e manter o histórico organizado, é recomendável criar uma nova branch para trabalhar em uma nova feature ou correção de bug.

   ```bash
   git checkout -b minha-nova-branch
   ```

   - Isso cria e muda para uma nova branch chamada "minha-nova-branch".

4. **Fazendo Mudanças e Comitando**
   - Faça as mudanças necessárias no código.
   - Após as mudanças, adicione os arquivos modificados ao índice com `git add` e crie um commit.

   ```bash
   git add .
   git commit -m "Descrição das mudanças"
   ```

5. **Puxando Mudanças da Branch Principal (Main)**
   - Antes de enviar suas mudanças para o repositório remoto, é importante garantir que sua branch está atualizada com as últimas mudanças da branch principal.

   ```bash
   git checkout main
   git pull origin main
   git checkout minha-nova-branch
   git merge main
   ```

   - Isso evita conflitos e facilita a integração das mudanças.

6. **Enviando Suas Mudanças para o Repositório Remoto**
   - Depois de testar suas mudanças e garantir que está tudo funcionando, envie sua branch para o repositório remoto.

   ```bash
   git push origin minha-nova-branch
   ```

7. **Criando um Pull Request (PR)**
   - No GitHub, vá até o repositório e crie um Pull Request (PR) da sua branch para a branch principal (geralmente `main`).
   - Descreva as mudanças realizadas no PR e peça a revisão de seus colaboradores.

8. **Revisando e Mesclando (Merge)**
   - Após a revisão, se não houver problemas, o PR será aprovado e mesclado na branch principal.
   - Caso haja conflitos ou problemas, você pode ser solicitado a corrigir e atualizar o PR.

9. **Mantendo o Repositório Local Atualizado**
   - Após o merge do PR, volte para a branch principal e puxe as últimas mudanças para manter seu repositório local atualizado.

   ```bash
   git checkout main
   git pull origin main
   ```

10. **Deletando a Branch Local e Remota**
    - Se sua branch não for mais necessária, você pode deletá-la localmente e remotamente.

    ```bash
    git branch -d minha-nova-branch
    git push origin --delete minha-nova-branch
    ```

## Dicas Adicionais
- **Branch Naming**: Use nomes descritivos para as branches, como `feature/login-page` ou `fix/bug-123`.
- **Commit Messages**: Escreva mensagens de commit claras e concisas.
- **Rebase**: Em projetos grandes, o rebase pode ser preferido ao merge para manter o histórico de commits mais limpo.
```
