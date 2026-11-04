import { PageHeader } from '../../../../components/layout/PageHeader';

export default function MealsNutritionPage() {
  return (
    <section className="container">
      <PageHeader eyebrow="STUDENT WELLBEING" title="Meals and nutrition" description="Healthy meals help students learn, grow, and thrive." />
      <article className="panel article-body"><h2>Nutrition at school</h2><p>Information about school meal programs, menus, and nutrition support will be published here by the school administration.</p><p>For questions, please use the <a href="../contact">contact page</a>.</p></article>
    </section>
  );
}