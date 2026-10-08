import type { Metadata } from "next";
import { OG_LOCALES, getLanguageAlternates, getLocalizedUrl } from "@/app/i18n";
import DocsNavbarComponent from "@/app/components/DocsNavbarComponent";
import DocsSidebarComponent from "@/app/components/DocsSidebarComponent";
import DocTableOfContentComponent from "@/app/components/DocTableOfContentComponent";

export const metadata: Metadata = {
  title: "Cómo usar Databasus con Neon Object Storage | Databasus",
  description:
    "Guía paso a paso para guardar copias de seguridad de PostgreSQL en Neon Object Storage con Databasus. Cree un bucket, obtenga las credenciales S3 y conéctelo como almacenamiento compatible con S3.",
  keywords: [
    "Databasus",
    "Neon",
    "Neon Object Storage",
    "copia de seguridad de PostgreSQL",
    "almacenamiento S3",
    "almacenamiento en la nube",
    "respaldo de base de datos",
  ],
  openGraph: {
    title: "Cómo usar Databasus con Neon Object Storage | Databasus",
    description:
      "Guía paso a paso para guardar copias de seguridad de PostgreSQL en Neon Object Storage con Databasus. Cree un bucket, obtenga las credenciales S3 y conéctelo como almacenamiento compatible con S3.",
    type: "article",
    url: getLocalizedUrl("es", "storages/neon"),
    locale: OG_LOCALES.es,
  },
  twitter: {
    card: "summary",
    title: "Cómo usar Databasus con Neon Object Storage | Databasus",
    description:
      "Guía paso a paso para guardar copias de seguridad de PostgreSQL en Neon Object Storage con Databasus. Cree un bucket, obtenga las credenciales S3 y conéctelo como almacenamiento compatible con S3.",
  },
  alternates: {
    canonical: getLocalizedUrl("es", "storages/neon"),
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
            name: "Cómo usar Databasus con Neon Object Storage",
            description:
              "Guía paso a paso para guardar copias de seguridad de PostgreSQL en Neon Object Storage con Databasus",
            step: [
              {
                "@type": "HowToStep",
                name: "Cree un bucket",
                text: "En Neon Console, abra su proyecto, seleccione una rama, abra la pestaña Object storage y haga clic en New bucket. Mantenga el nivel de acceso private.",
              },
              {
                "@type": "HowToStep",
                name: "Obtenga las credenciales S3",
                text: "Haga clic en Connect, abra la pestaña Storage, elija Parameters only y haga clic en Reveal credential. Copie AWS_ENDPOINT_URL_S3, AWS_REGION, AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY.",
              },
              {
                "@type": "HowToStep",
                name: "Complete el formulario de almacenamiento S3",
                text: "En Databasus, agregue un almacenamiento S3 e introduzca el nombre del bucket, la región, la clave de acceso, la clave secreta y el endpoint de Neon.",
              },
              {
                "@type": "HowToStep",
                name: "Mantenga el direccionamiento path-style",
                text: "Deje Host virtual desmarcado y Clase de almacenamiento en su valor predeterminado.",
              },
              {
                "@type": "HowToStep",
                name: "Pruebe y guarde",
                text: "Haga clic en Probar conexión y luego guarde el almacenamiento.",
              },
            ],
          }),
        }}
      />

      <DocsNavbarComponent lang="es" />

      <div className="flex min-h-screen bg-[#0F1115]">
        {/* Sidebar */}
        <DocsSidebarComponent lang="es" />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-blue max-w-none">
              <h1 id="neon">Neon Object Storage</h1>

              <p className="text-lg text-gray-400">
                Neon Object Storage es un almacenamiento compatible con S3 que
                pertenece a una rama de un proyecto de Neon. Databasus se
                conecta a él mediante el tipo de almacenamiento S3 habitual, así
                que solo necesita un bucket, una credencial y el endpoint de la
                rama.
              </p>

              <h2 id="before-you-start">Antes de empezar</h2>

              <p>
                Necesita un proyecto de Neon en una región donde{" "}
                <a
                  href="https://neon.com/docs/storage/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Object Storage esté disponible
                </a>
                .
              </p>

              <h2 id="configuration-steps">Pasos de configuración</h2>

              <h3 id="create-bucket">1. Cree un bucket</h3>

              <p>
                En Neon Console, abra su proyecto, seleccione la rama que
                guardará las copias de seguridad y abra la pestaña{" "}
                <strong>Object storage</strong>. Haga clic en{" "}
                <strong>New bucket</strong>, introduzca un nombre como{" "}
                <code>databasus-backups</code>, mantenga el nivel de acceso{" "}
                <strong>private</strong> y haga clic en <strong>Create</strong>.
              </p>

              <p>
                Con{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://neon.com/docs/storage/buckets#create-a-bucket"
                >
                  Neon CLI
                </a>
                , este paso es un solo comando:
              </p>

              <pre>
                <code>neon buckets create databasus-backups</code>
              </pre>

              <h3 id="get-credentials">2. Obtenga las credenciales S3</h3>

              <p>
                Haga clic en <strong>Connect</strong> y abra la pestaña{" "}
                <strong>Storage</strong>. Elija la pestaña <strong>.env</strong>{" "}
                y verá cuatro valores:
              </p>

              <pre>
                <code>{`AWS_ENDPOINT_URL_S3=https://br-cool-darkness-a1b2c3d4.storage.c-1.us-east-2.aws.neon.tech
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=nak_live_...
AWS_SECRET_ACCESS_KEY=...`}</code>
              </pre>

              <p>
                Para darle a Databasus su propia credencial, que pueda revocar
                por separado, créela con Neon CLI. Necesita ambos scopes de
                almacenamiento, porque Databasus vuelve a leer las copias de
                seguridad y las elimina según la política de retención:
              </p>

              <pre>
                <code>
                  {
                    "neon credentials create --scope storage:read --scope storage:write --name databasus"
                  }
                </code>
              </pre>

              <p>
                En la salida, <code>token_id</code> es la clave de acceso y{" "}
                <code>s3_secret_access_key</code> es la clave secreta. Neon
                muestra el secreto una sola vez (en la CLI), así que cópielo de
                inmediato.
              </p>

              <h3 id="fill-storage-form">
                3. Complete el formulario de almacenamiento S3
              </h3>

              <p>
                En Databasus, agregue un nuevo almacenamiento, elija{" "}
                <strong>S3</strong> y complete los campos:
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Campo de Databasus</th>
                    <th>Valor de Neon</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bucket de S3</td>
                    <td data-label="Valor de Neon">
                      El nombre del bucket, por ejemplo{" "}
                      <code>databasus-backups</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Región</td>
                    <td data-label="Valor de Neon">
                      <code>AWS_REGION</code>, por ejemplo{" "}
                      <code>us-east-2</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Clave de acceso</td>
                    <td data-label="Valor de Neon">
                      <code>AWS_ACCESS_KEY_ID</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Clave secreta</td>
                    <td data-label="Valor de Neon">
                      <code>AWS_SECRET_ACCESS_KEY</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Endpoint</td>
                    <td data-label="Valor de Neon">
                      <code>AWS_ENDPOINT_URL_S3</code>, incluido{" "}
                      <code>https://</code>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 id="advanced-settings">
                4. Revise la configuración avanzada
              </h3>

              <p>
                Neon solo acepta solicitudes path-style. Deje{" "}
                <strong>Host virtual</strong> desmarcado: si lo activa, el
                nombre del bucket pasa a formar parte del nombre de host y la
                prueba de conexión falla con un error de certificado TLS.
              </p>

              <p>
                Deje <strong>Clase de almacenamiento</strong> en su valor
                predeterminado. Neon no tiene clases de almacenamiento e ignora
                este ajuste. El <strong>Prefijo de carpeta</strong> funciona
                como siempre si quiere guardar varias instancias de Databasus en
                un mismo bucket.
              </p>

              <h3 id="test-connection">5. Pruebe y guarde</h3>

              <p>
                Haga clic en <strong>Probar conexión</strong>. Databasus escribe
                un pequeño archivo de prueba en el bucket, lo vuelve a leer y lo
                elimina. Cuando la prueba sea correcta, guarde el
                almacenamiento.
              </p>

              <p>
                Databasus ya está listo para usar Neon Object Storage como
                almacenamiento de sus copias de seguridad de PostgreSQL.
              </p>

              <h2 id="branches">Ramas y copias de seguridad</h2>

              <p>
                El endpoint y la credencial pertenecen a una sola rama, y
                Databasus siempre escribe en esa rama. La credencial también
                funciona en las ramas que se creen después a partir de ella.
              </p>

              <ul>
                <li>
                  Una nueva rama hija recibe una instantánea copy-on-write del
                  bucket en el momento de su creación. Las copias de seguridad
                  escritas después solo aparecen en la rama padre.
                </li>
                <li>
                  Al eliminar la rama o el proyecto se eliminan sus buckets y
                  todas las copias de seguridad que contienen.
                </li>
              </ul>

              {/* Navigation */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <a
                  href="/es/storages"
                  className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800"
                >
                  ← Volver a almacenamientos
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
