import type { Metadata } from "next";
import { OG_LOCALES, getLanguageAlternates, getLocalizedUrl } from "@/app/i18n";
import DocsNavbarComponent from "@/app/components/DocsNavbarComponent";
import DocsSidebarComponent from "@/app/components/DocsSidebarComponent";
import DocTableOfContentComponent from "@/app/components/DocTableOfContentComponent";

export const metadata: Metadata = {
  title: "Como usar o Databasus com o Neon Object Storage | Databasus",
  description:
    "Guia passo a passo para guardar backups PostgreSQL no Neon Object Storage com o Databasus. Crie um bucket, obtenha as credenciais S3 e conecte o bucket como armazenamento compatível com S3.",
  keywords: [
    "Databasus",
    "Neon",
    "Neon Object Storage",
    "backup PostgreSQL",
    "armazenamento S3",
    "armazenamento em nuvem",
    "backup de banco de dados",
  ],
  openGraph: {
    title: "Como usar o Databasus com o Neon Object Storage | Databasus",
    description:
      "Guia passo a passo para guardar backups PostgreSQL no Neon Object Storage com o Databasus. Crie um bucket, obtenha as credenciais S3 e conecte o bucket como armazenamento compatível com S3.",
    type: "article",
    url: getLocalizedUrl("pt", "storages/neon"),
    locale: OG_LOCALES.pt,
  },
  twitter: {
    card: "summary",
    title: "Como usar o Databasus com o Neon Object Storage | Databasus",
    description:
      "Guia passo a passo para guardar backups PostgreSQL no Neon Object Storage com o Databasus. Crie um bucket, obtenha as credenciais S3 e conecte o bucket como armazenamento compatível com S3.",
  },
  alternates: {
    canonical: getLocalizedUrl("pt", "storages/neon"),
    languages: getLanguageAlternates("storages/neon"),
  },
  robots: "index, follow",
};

export default function NeonStoragePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Como usar o Databasus com o Neon Object Storage",
            description:
              "Guia passo a passo para guardar backups PostgreSQL no Neon Object Storage com o Databasus",
            step: [
              {
                "@type": "HowToStep",
                name: "Crie um bucket",
                text: "No Neon Console, abra o projeto, selecione um branch, abra a aba Object storage e clique em New bucket. Mantenha o nível de acesso private.",
              },
              {
                "@type": "HowToStep",
                name: "Obtenha as credenciais S3",
                text: "Clique em Connect, abra a aba Storage, escolha Parameters only e clique em Reveal credential. Copie AWS_ENDPOINT_URL_S3, AWS_REGION, AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY.",
              },
              {
                "@type": "HowToStep",
                name: "Preencha o formulário de armazenamento S3",
                text: "No Databasus, adicione um armazenamento S3 e informe o nome do bucket, a região, a chave de acesso, a chave secreta e o endpoint do Neon.",
              },
              {
                "@type": "HowToStep",
                name: "Mantenha o endereçamento path-style",
                text: "Deixe Host virtual desmarcado e Classe de armazenamento no valor padrão.",
              },
              {
                "@type": "HowToStep",
                name: "Teste e salve",
                text: "Clique em Testar conexão e depois salve o armazenamento.",
              },
            ],
          }),
        }}
      />

      <DocsNavbarComponent lang="pt" />

      <div className="flex min-h-screen bg-[#0F1115]">
        {/* Sidebar */}
        <DocsSidebarComponent lang="pt" />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-blue max-w-none">
              <h1 id="neon">Neon Object Storage</h1>

              <p className="text-lg text-gray-400">
                O Neon Object Storage é um armazenamento compatível com S3 que
                pertence a um branch de um projeto Neon. O Databasus se conecta
                a ele pelo tipo de armazenamento S3 comum, então você só precisa
                de um bucket, uma credencial e o endpoint do branch.
              </p>

              <h2 id="before-you-start">Antes de começar</h2>

              <p>
                Você precisa de um projeto Neon em uma região onde o{" "}
                <a
                  href="https://neon.com/docs/storage/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Object Storage esteja disponível
                </a>
                .
              </p>

              <h2 id="configuration-steps">Passos de configuração</h2>

              <h3 id="create-bucket">1. Crie um bucket</h3>

              <p>
                No Neon Console, abra o projeto, selecione o branch que vai
                guardar os backups e abra a aba <strong>Object storage</strong>.
                Clique em <strong>New bucket</strong>, digite um nome como{" "}
                <code>databasus-backups</code>, mantenha o nível de acesso{" "}
                <strong>private</strong> e clique em <strong>Create</strong>.
              </p>

              <p>
                Com o{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://neon.com/docs/storage/buckets#create-a-bucket"
                >
                  Neon CLI
                </a>
                , o mesmo passo é um único comando:
              </p>

              <pre>
                <code>neon buckets create databasus-backups</code>
              </pre>

              <h3 id="get-credentials">2. Obtenha as credenciais S3</h3>

              <p>
                Clique em <strong>Connect</strong> e abra a aba{" "}
                <strong>Storage</strong>. Escolha a aba <strong>.env</strong> e
                você verá quatro valores:
              </p>

              <pre>
                <code>{`AWS_ENDPOINT_URL_S3=https://br-cool-darkness-a1b2c3d4.storage.c-1.us-east-2.aws.neon.tech
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=nak_live_...
AWS_SECRET_ACCESS_KEY=...`}</code>
              </pre>

              <p>
                Para dar ao Databasus uma credencial própria, que você pode
                revogar separadamente, crie uma com o Neon CLI. Ela precisa dos
                dois scopes de armazenamento, porque o Databasus lê os backups
                de volta e os apaga conforme a política de retenção:
              </p>

              <pre>
                <code>
                  {
                    "neon credentials create --scope storage:read --scope storage:write --name databasus"
                  }
                </code>
              </pre>

              <p>
                Na saída, <code>token_id</code> é a chave de acesso e{" "}
                <code>s3_secret_access_key</code> é a chave secreta. O Neon
                mostra o segredo uma única vez (pelo CLI), então salve esse
                valor imediatamente.
              </p>

              <h3 id="fill-storage-form">
                3. Preencha o formulário de armazenamento S3
              </h3>

              <p>
                No Databasus, adicione um novo armazenamento, escolha{" "}
                <strong>S3</strong> e preencha os campos:
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Campo do Databasus</th>
                    <th>Valor do Neon</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bucket S3</td>
                    <td data-label="Valor do Neon">
                      O nome do bucket, por exemplo{" "}
                      <code>databasus-backups</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Região</td>
                    <td data-label="Valor do Neon">
                      <code>AWS_REGION</code>, por exemplo{" "}
                      <code>us-east-2</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Chave de acesso</td>
                    <td data-label="Valor do Neon">
                      <code>AWS_ACCESS_KEY_ID</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Chave secreta</td>
                    <td data-label="Valor do Neon">
                      <code>AWS_SECRET_ACCESS_KEY</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Endpoint</td>
                    <td data-label="Valor do Neon">
                      <code>AWS_ENDPOINT_URL_S3</code>, incluindo{" "}
                      <code>https://</code>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 id="advanced-settings">
                4. Confira as configurações avançadas
              </h3>

              <p>
                O Neon aceita apenas requisições path-style. Deixe{" "}
                <strong>Host virtual</strong> desmarcado: com essa opção
                ativada, o nome do bucket passa a fazer parte do nome do host e
                o teste de conexão falha com um erro de certificado TLS.
              </p>

              <p>
                Deixe <strong>Classe de armazenamento</strong> no valor padrão.
                O Neon não tem classes de armazenamento e ignora essa
                configuração. O <strong>Prefixo da pasta</strong> funciona
                normalmente se você quiser manter várias instâncias do Databasus
                no mesmo bucket.
              </p>

              <h3 id="test-connection">5. Teste e salve</h3>

              <p>
                Clique em <strong>Testar conexão</strong>. O Databasus grava um
                pequeno arquivo de teste no bucket, lê esse arquivo de volta e o
                apaga. Quando o teste passar, salve o armazenamento.
              </p>

              <p>
                Seu Databasus está pronto para usar o Neon Object Storage como
                armazenamento dos seus backups PostgreSQL.
              </p>

              <h2 id="branches">Branches e backups</h2>

              <p>
                O endpoint e a credencial pertencem a um único branch, e o
                Databasus sempre grava nesse branch. A credencial também
                funciona nos branches criados a partir dele depois.
              </p>

              <ul>
                <li>
                  Um novo branch filho recebe um snapshot copy-on-write do
                  bucket no momento da criação. Os backups gravados depois disso
                  aparecem apenas no branch pai.
                </li>
                <li>
                  Excluir o branch ou o projeto exclui os buckets e todos os
                  backups dentro deles.
                </li>
              </ul>

              {/* Navigation */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <a
                  href="/pt/storages"
                  className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800"
                >
                  ← Voltar aos armazenamentos
                </a>
              </div>
            </article>
          </div>
        </main>

        {/* Table of Contents */}
        <DocTableOfContentComponent />
      </div>
    </>
  );
}
