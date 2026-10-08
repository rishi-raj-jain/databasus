import type { Metadata } from "next";
import { OG_LOCALES, getLanguageAlternates, getLocalizedUrl } from "@/app/i18n";
import DocsNavbarComponent from "@/app/components/DocsNavbarComponent";
import DocsSidebarComponent from "@/app/components/DocsSidebarComponent";
import DocTableOfContentComponent from "@/app/components/DocTableOfContentComponent";

export const metadata: Metadata = {
  title: "Comment utiliser Databasus avec Neon Object Storage | Databasus",
  description:
    "Guide pas à pas pour stocker vos sauvegardes PostgreSQL dans Neon Object Storage avec Databasus. Créez un bucket, récupérez les identifiants S3 et connectez-le comme stockage compatible S3.",
  keywords: [
    "Databasus",
    "Neon",
    "Neon Object Storage",
    "sauvegarde PostgreSQL",
    "stockage S3",
    "stockage cloud",
    "sauvegarde de base de données",
  ],
  openGraph: {
    title: "Comment utiliser Databasus avec Neon Object Storage | Databasus",
    description:
      "Guide pas à pas pour stocker vos sauvegardes PostgreSQL dans Neon Object Storage avec Databasus. Créez un bucket, récupérez les identifiants S3 et connectez-le comme stockage compatible S3.",
    type: "article",
    url: getLocalizedUrl("fr", "storages/neon"),
    locale: OG_LOCALES.fr,
  },
  twitter: {
    card: "summary",
    title: "Comment utiliser Databasus avec Neon Object Storage | Databasus",
    description:
      "Guide pas à pas pour stocker vos sauvegardes PostgreSQL dans Neon Object Storage avec Databasus. Créez un bucket, récupérez les identifiants S3 et connectez-le comme stockage compatible S3.",
  },
  alternates: {
    canonical: getLocalizedUrl("fr", "storages/neon"),
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
            name: "Comment utiliser Databasus avec Neon Object Storage",
            description:
              "Guide pas à pas pour stocker vos sauvegardes PostgreSQL dans Neon Object Storage avec Databasus",
            step: [
              {
                "@type": "HowToStep",
                name: "Créez un bucket",
                text: "Dans la Neon Console, ouvrez votre projet, sélectionnez une branche, ouvrez l'onglet Object storage et cliquez sur New bucket. Gardez le niveau d'accès private.",
              },
              {
                "@type": "HowToStep",
                name: "Récupérez les identifiants S3",
                text: "Cliquez sur Connect, ouvrez l'onglet Storage, choisissez Parameters only et cliquez sur Reveal credential. Copiez AWS_ENDPOINT_URL_S3, AWS_REGION, AWS_ACCESS_KEY_ID et AWS_SECRET_ACCESS_KEY.",
              },
              {
                "@type": "HowToStep",
                name: "Remplissez le formulaire de stockage S3",
                text: "Dans Databasus, ajoutez un stockage S3 et saisissez le nom du bucket, la région, la clé d'accès, la clé secrète et l'endpoint fournis par Neon.",
              },
              {
                "@type": "HowToStep",
                name: "Conservez l'adressage path-style",
                text: "Laissez Hôte virtuel décoché et Classe de stockage sur sa valeur par défaut.",
              },
              {
                "@type": "HowToStep",
                name: "Testez et enregistrez",
                text: "Cliquez sur Tester la connexion, puis enregistrez le stockage.",
              },
            ],
          }),
        }}
      />

      <DocsNavbarComponent lang="fr" />

      <div className="flex min-h-screen bg-[#0F1115]">
        {/* Sidebar */}
        <DocsSidebarComponent lang="fr" />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-blue max-w-none">
              <h1 id="neon">Neon Object Storage</h1>

              <p className="text-lg text-gray-400">
                Neon Object Storage est un stockage compatible S3 rattaché à une
                branche d&apos;un projet Neon. Databasus s&apos;y connecte via
                le type de stockage S3 habituel : il vous faut seulement un
                bucket, des identifiants et l&apos;endpoint de la branche.
              </p>

              <h2 id="before-you-start">Avant de commencer</h2>

              <p>
                Il vous faut un projet Neon dans une région où{" "}
                <a
                  href="https://neon.com/docs/storage/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Object Storage est disponible
                </a>
                .
              </p>

              <h2 id="configuration-steps">Étapes de configuration</h2>

              <h3 id="create-bucket">1. Créez un bucket</h3>

              <p>
                Dans la Neon Console, ouvrez votre projet, sélectionnez la
                branche qui accueillera les sauvegardes et ouvrez l&apos;onglet{" "}
                <strong>Object storage</strong>. Cliquez sur{" "}
                <strong>New bucket</strong>, saisissez un nom comme{" "}
                <code>databasus-backups</code>, gardez le niveau d&apos;accès{" "}
                <strong>private</strong> et cliquez sur <strong>Create</strong>.
              </p>

              <p>
                Avec la{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://neon.com/docs/storage/buckets#create-a-bucket"
                >
                  Neon CLI
                </a>
                , cette étape tient en une commande :
              </p>

              <pre>
                <code>neon buckets create databasus-backups</code>
              </pre>

              <h3 id="get-credentials">2. Récupérez les identifiants S3</h3>

              <p>
                Cliquez sur <strong>Connect</strong> et ouvrez l&apos;onglet{" "}
                <strong>Storage</strong>. Choisissez l&apos;onglet{" "}
                <strong>.env</strong> pour afficher quatre valeurs :
              </p>

              <pre>
                <code>{`AWS_ENDPOINT_URL_S3=https://br-cool-darkness-a1b2c3d4.storage.c-1.us-east-2.aws.neon.tech
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=nak_live_...
AWS_SECRET_ACCESS_KEY=...`}</code>
              </pre>

              <p>
                Pour donner à Databasus ses propres identifiants, révocables
                séparément, créez-les avec la Neon CLI. Ils ont besoin des deux
                scopes de stockage, car Databasus relit les sauvegardes et les
                supprime selon la politique de rétention :
              </p>

              <pre>
                <code>
                  {
                    "neon credentials create --scope storage:read --scope storage:write --name databasus"
                  }
                </code>
              </pre>

              <p>
                Dans la sortie, <code>token_id</code> est la clé d&apos;accès et{" "}
                <code>s3_secret_access_key</code> la clé secrète. Neon
                n&apos;affiche le secret qu&apos;une seule fois (via la CLI) :
                copiez-le tout de suite.
              </p>

              <h3 id="fill-storage-form">
                3. Remplissez le formulaire de stockage S3
              </h3>

              <p>
                Dans Databasus, ajoutez un nouveau stockage, choisissez{" "}
                <strong>S3</strong> et remplissez les champs :
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Champ Databasus</th>
                    <th>Valeur fournie par Neon</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bucket S3</td>
                    <td data-label="Valeur fournie par Neon">
                      Le nom du bucket, par exemple{" "}
                      <code>databasus-backups</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Région</td>
                    <td data-label="Valeur fournie par Neon">
                      <code>AWS_REGION</code>, par exemple{" "}
                      <code>us-east-2</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Clé d&apos;accès</td>
                    <td data-label="Valeur fournie par Neon">
                      <code>AWS_ACCESS_KEY_ID</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Clé secrète</td>
                    <td data-label="Valeur fournie par Neon">
                      <code>AWS_SECRET_ACCESS_KEY</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Endpoint</td>
                    <td data-label="Valeur fournie par Neon">
                      <code>AWS_ENDPOINT_URL_S3</code>, avec{" "}
                      <code>https://</code>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 id="advanced-settings">4. Vérifiez les paramètres avancés</h3>

              <p>
                Neon n&apos;accepte que les requêtes path-style. Laissez{" "}
                <strong>Hôte virtuel</strong> décoché : une fois activé, le nom
                du bucket entre dans le nom d&apos;hôte et le test de connexion
                échoue avec une erreur de certificat TLS.
              </p>

              <p>
                Laissez <strong>Classe de stockage</strong> sur sa valeur par
                défaut. Neon n&apos;a pas de classes de stockage et ignore ce
                réglage. Le <strong>Préfixe de dossier</strong> fonctionne
                normalement si vous voulez regrouper plusieurs instances de
                Databasus dans un même bucket.
              </p>

              <h3 id="test-connection">5. Testez et enregistrez</h3>

              <p>
                Cliquez sur <strong>Tester la connexion</strong>. Databasus
                écrit un petit fichier de test dans le bucket, le relit puis le
                supprime. Si le test réussit, enregistrez le stockage.
              </p>

              <p>
                Votre Databasus est maintenant prêt à utiliser Neon Object
                Storage comme stockage pour vos sauvegardes PostgreSQL.
              </p>

              <h2 id="branches">Branches et sauvegardes</h2>

              <p>
                L&apos;endpoint et les identifiants appartiennent à une seule
                branche, et Databasus écrit toujours dans cette branche. Les
                identifiants restent valables sur les branches créées ensuite à
                partir d&apos;elle.
              </p>

              <ul>
                <li>
                  Une nouvelle branche enfant reçoit un instantané copy-on-write
                  du bucket au moment de sa création. Les sauvegardes écrites
                  ensuite n&apos;apparaissent que sur la branche parente.
                </li>
                <li>
                  Supprimer la branche ou le projet supprime ses buckets et
                  toutes les sauvegardes qu&apos;ils contiennent.
                </li>
              </ul>

              {/* Navigation */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <a
                  href="/fr/storages"
                  className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800"
                >
                  ← Retour aux stockages
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
