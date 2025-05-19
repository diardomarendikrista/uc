import Layout from "layout/Layout";

export default function MataKuliah() {
  return (
    <Layout
      title="Mata Kuliah"
      backTo="/"
    >
      <div className="flex justify-center mt-2">
        <img
          src="/assets/img/mata-kuliah.png"
          alt="Mata Kuliah"
        />
      </div>
    </Layout>
  );
}
