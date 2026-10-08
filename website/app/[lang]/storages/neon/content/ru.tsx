import type { Metadata } from "next";
import { OG_LOCALES, getLanguageAlternates, getLocalizedUrl } from "@/app/i18n";
import DocsNavbarComponent from "@/app/components/DocsNavbarComponent";
import DocsSidebarComponent from "@/app/components/DocsSidebarComponent";
import DocTableOfContentComponent from "@/app/components/DocTableOfContentComponent";

export const metadata: Metadata = {
  title: "Как использовать Databasus с Neon Object Storage | Databasus",
  description:
    "Пошаговое руководство по хранению бекапов PostgreSQL в Neon Object Storage с Databasus. Создайте бакет, получите ключи S3 и подключите его как S3-совместимое хранилище.",
  keywords: [
    "Databasus",
    "Neon",
    "Neon Object Storage",
    "резервное копирование PostgreSQL",
    "хранилище S3",
    "облачное хранилище",
    "бекап базы данных",
  ],
  openGraph: {
    title: "Как использовать Databasus с Neon Object Storage | Databasus",
    description:
      "Пошаговое руководство по хранению бекапов PostgreSQL в Neon Object Storage с Databasus. Создайте бакет, получите ключи S3 и подключите его как S3-совместимое хранилище.",
    type: "article",
    url: getLocalizedUrl("ru", "storages/neon"),
    locale: OG_LOCALES.ru,
  },
  twitter: {
    card: "summary",
    title: "Как использовать Databasus с Neon Object Storage | Databasus",
    description:
      "Пошаговое руководство по хранению бекапов PostgreSQL в Neon Object Storage с Databasus. Создайте бакет, получите ключи S3 и подключите его как S3-совместимое хранилище.",
  },
  alternates: {
    canonical: getLocalizedUrl("ru", "storages/neon"),
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
            name: "Как использовать Databasus с Neon Object Storage",
            description:
              "Пошаговое руководство по хранению бекапов PostgreSQL в Neon Object Storage с Databasus",
            step: [
              {
                "@type": "HowToStep",
                name: "Создайте бакет",
                text: "В Neon Console откройте проект, выберите ветку, перейдите на вкладку Object storage и нажмите New bucket. Оставьте уровень доступа private.",
              },
              {
                "@type": "HowToStep",
                name: "Получите ключи S3",
                text: "Нажмите Connect, откройте вкладку Storage, выберите Parameters only и нажмите Reveal credential. Скопируйте AWS_ENDPOINT_URL_S3, AWS_REGION, AWS_ACCESS_KEY_ID и AWS_SECRET_ACCESS_KEY.",
              },
              {
                "@type": "HowToStep",
                name: "Заполните форму хранилища S3",
                text: "В Databasus добавьте хранилище S3 и укажите имя бакета, регион, ключ доступа, секретный ключ и эндпоинт из Neon.",
              },
              {
                "@type": "HowToStep",
                name: "Оставьте path-style адресацию",
                text: "Не включайте «Виртуальный хост» и оставьте класс хранения по умолчанию.",
              },
              {
                "@type": "HowToStep",
                name: "Проверьте и сохраните",
                text: "Нажмите «Проверить подключение», затем сохраните хранилище.",
              },
            ],
          }),
        }}
      />

      <DocsNavbarComponent lang="ru" />

      <div className="flex min-h-screen bg-[#0F1115]">
        {/* Sidebar */}
        <DocsSidebarComponent lang="ru" />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-blue max-w-none">
              <h1 id="neon">Neon Object Storage</h1>

              <p className="text-lg text-gray-400">
                В Neon Object Storage каждая ветка проекта Neon получает свое
                S3-совместимое хранилище. Databasus подключается к нему через
                обычный тип хранилища S3, поэтому нужны только бакет, ключи
                доступа и эндпоинт ветки.
              </p>

              <h2 id="before-you-start">Перед началом</h2>

              <p>
                Нужен проект Neon в регионе, где{" "}
                <a
                  href="https://neon.com/docs/storage/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  доступно Object Storage
                </a>
                .
              </p>

              <h2 id="configuration-steps">Шаги настройки</h2>

              <h3 id="create-bucket">1. Создайте бакет</h3>

              <p>
                В Neon Console откройте проект, выберите ветку, в которой будут
                храниться бекапы, и перейдите на вкладку{" "}
                <strong>Object storage</strong>. Нажмите{" "}
                <strong>New bucket</strong>, введите имя, например{" "}
                <code>databasus-backups</code>, оставьте уровень доступа{" "}
                <strong>private</strong> и нажмите <strong>Create</strong>.
              </p>

              <p>
                В{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://neon.com/docs/storage/buckets#create-a-bucket"
                >
                  Neon CLI
                </a>{" "}
                это одна команда:
              </p>

              <pre>
                <code>neon buckets create databasus-backups</code>
              </pre>

              <h3 id="get-credentials">2. Получите ключи S3</h3>

              <p>
                Нажмите <strong>Connect</strong> и откройте вкладку{" "}
                <strong>Storage</strong>. Выберите вкладку <strong>.env</strong>
                , и вы увидите четыре значения:
              </p>

              <pre>
                <code>{`AWS_ENDPOINT_URL_S3=https://br-cool-darkness-a1b2c3d4.storage.c-1.us-east-2.aws.neon.tech
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=nak_live_...
AWS_SECRET_ACCESS_KEY=...`}</code>
              </pre>

              <p>
                Чтобы у Databasus были собственные ключи, которые можно отозвать
                отдельно, создайте их в Neon CLI. Нужны оба scope хранилища,
                потому что Databasus читает бекапы обратно и удаляет их по
                политике хранения:
              </p>

              <pre>
                <code>
                  {
                    "neon credentials create --scope storage:read --scope storage:write --name databasus"
                  }
                </code>
              </pre>

              <p>
                В выводе команды <code>token_id</code> служит ключом доступа, а{" "}
                <code>s3_secret_access_key</code> секретным ключом. Neon
                показывает секрет только один раз (в CLI), поэтому скопируйте
                его сразу.
              </p>

              <h3 id="fill-storage-form">3. Заполните форму хранилища S3</h3>

              <p>
                В Databasus добавьте новое хранилище, выберите{" "}
                <strong>S3</strong> и заполните поля:
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Поле Databasus</th>
                    <th>Значение из Neon</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Бакет S3</td>
                    <td data-label="Значение из Neon">
                      Имя бакета, например <code>databasus-backups</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Регион</td>
                    <td data-label="Значение из Neon">
                      <code>AWS_REGION</code>, например <code>us-east-2</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Ключ доступа</td>
                    <td data-label="Значение из Neon">
                      <code>AWS_ACCESS_KEY_ID</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Секретный ключ</td>
                    <td data-label="Значение из Neon">
                      <code>AWS_SECRET_ACCESS_KEY</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Эндпоинт</td>
                    <td data-label="Значение из Neon">
                      <code>AWS_ENDPOINT_URL_S3</code> вместе с{" "}
                      <code>https://</code>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 id="advanced-settings">
                4. Проверьте дополнительные настройки
              </h3>

              <p>
                Neon принимает только path-style запросы. Не включайте{" "}
                <strong>Виртуальный хост</strong>: в этом режиме имя бакета
                становится частью имени хоста, и проверка подключения падает с
                ошибкой TLS-сертификата.
              </p>

              <p>
                Оставьте <strong>Класс хранения</strong> по умолчанию. В Neon
                нет классов хранения, и эта настройка игнорируется.{" "}
                <strong>Префикс папки</strong> работает как обычно, если хотите
                хранить в одном бакете бекапы нескольких экземпляров Databasus.
              </p>

              <h3 id="test-connection">5. Проверьте и сохраните</h3>

              <p>
                Нажмите <strong>Проверить подключение</strong>. Databasus
                запишет в бакет небольшой тестовый файл, прочитает его и удалит.
                Если проверка прошла, сохраните хранилище.
              </p>

              <p>
                Теперь Databasus готов использовать Neon Object Storage как
                хранилище для ваших бекапов PostgreSQL.
              </p>

              <h2 id="branches">Ветки и бекапы</h2>

              <p>
                Эндпоинт и ключи принадлежат одной ветке, и Databasus всегда
                пишет в нее. Ключи также работают в ветках, которые позже
                создадут от этой ветки.
              </p>

              <ul>
                <li>
                  Новая дочерняя ветка получает copy-on-write снимок бакета на
                  момент создания. Бекапы, записанные после этого, есть только в
                  родительской ветке.
                </li>
                <li>
                  При удалении ветки или проекта удаляются его бакеты и все
                  бекапы в них.
                </li>
              </ul>

              {/* Navigation */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <a
                  href="/ru/storages"
                  className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800"
                >
                  ← Назад к хранилищам
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
