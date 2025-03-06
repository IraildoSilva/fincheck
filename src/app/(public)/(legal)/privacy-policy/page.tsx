export default function PrivacyPolicyPage() {
  return (
    <div>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          1. Informações Coletadas Coletamos os seguintes tipos de informações:
        </h2>
        <p className="mb-4 text-muted-foreground">
          Informações de perfil (nome, e-mail) Dados de eventos e despesas
          Informações de uso do aplicativo Dados de dispositivo e navegador
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Uso das Informações</h2>
        <p className="mb-4 text-muted-foreground">
          Utilizamos suas informações para:
        </p>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>Fornecer e melhorar nossos serviços</li>
          <li>Personalizar sua experiência</li>
          <li>Enviar comunicações importantes</li>
          <li>Análise e otimização do serviço</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Proteção de Dados</h2>
        <p className="mb-4 text-muted-foreground">
          Implementamos medidas de segurança como:
        </p>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>Criptografia de dados sensíveis</li>
          <li>Acesso restrito a informações pessoais</li>
          <li>Monitoramento regular de segurança</li>
          <li>Backups periódicos</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          4. Compartilhamento de Dados
        </h2>
        <p className="mb-4 text-muted-foreground">
          Seus dados podem ser compartilhados com:
        </p>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>Provedores de serviços essenciais</li>
          <li>Autoridades quando legalmente requerido</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Seus Direitos</h2>
        <p className="mb-4 text-muted-foreground">Você tem direito a:</p>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>Acessar seus dados pessoais</li>
          <li>Solicitar correções de dados</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Cookies e tecnologias</h2>
        <p className="mb-4 text-muted-foreground">
          Utilizamos cookies e tecnologias similares paraL:
        </p>

        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>Manter sua sessão ativa</li>
          <li>Lembrar suas preferências</li>
          <li>Análise de uso do serviço</li>
          <li>Melhorar a experiência do usuário</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Retenção dos Dados</h2>
        <p className="mb-4 text-muted-foreground">
          Mantemos seus dados apenas pelo tempo necessário para:
        </p>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>Fornecer nossos serviços</li>
          <li>Cumprir obrigações legais</li>
          <li>Resolver disputas</li>
        </ul>
      </section>
    </div>
  )
}
