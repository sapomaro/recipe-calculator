import { StoreProvider as LocalStoreProvider } from './store';
import { ClearButton, ErrorBoundary, Note, PasteButton, RadioField,
  TextareaInput, TextareaOutput } from './components';
import { ANCHOR_LINKS } from './constants/anchorLinks';

import styles from './RecipeCalculator.module.scss';

export function RecipeCalculator() {
  return (
    <div className={styles.container} itemScope itemType="http://schema.org/WebApplication">
      <ErrorBoundary>
        <LocalStoreProvider>
          <section className={styles.section}>
            <h1 itemProp="name">Калькулятор ингредиентов и форм для выпечки</h1>
  
            <h2>Для чего он нужен и как работает</h2>

            <p itemProp="description">Вы нашли рецепт, который рассчитан на большое количество порций, 
              а вы хотите приготовить в два раза меньше. Либо в инструкции указана 
              большая круглая форма для выпечки, а у вас есть только маленькая 
              квадратная, и нужно пересчитать количество ингредиентов, чтобы десерт 
              получился такой же высоты. Для подобных случаев и создан этот 
              кулинарный калькулятор.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Шаг №1: укажите исходные данные из рецепта</h2>
            <hr />
            <h3 id={ANCHOR_LINKS.STEP1_MEASURES}>Количество порций ∕ размеры формы для выпечки:</h3>

            <div className={styles.fieldset}>
              <div>
                <RadioField name="servings" group="in" />
              </div>
              <div>
                <RadioField name="round_pan" group="in" />
                <RadioField name="rect_pan" group="in" />
              </div>
            </div>

            <p>
              <i>
                Выберите одну из категорий. Порции нельзя пересчитать в размеры формы для выпечки и наоборот.
              </i>
            </p>

            <hr />

            <h3>Исходные ингредиенты:</h3>

            <TextareaInput name="ingredients" group="in" />

            <div className={styles.buttonset}>
              <PasteButton name="paste" group="in" />
              <ClearButton name="clear" group="in" />
            </div>
          </section>

          <section className={styles.section}>
            <h2>Шаг №2: укажите желаемые параметры для пересчёта</h2>
            <hr />
            <h3 id={ANCHOR_LINKS.STEP2_MEASURES}>Новое количество порций ∕ размеры вашей формы для выпечки:</h3>

            <div className={styles.fieldset}>
              <div>
                <RadioField name="servings" group="out" />
              </div>
              <div>
                <RadioField name="round_pan" group="out" />
                <RadioField name="rect_pan" group="out" />
              </div>
            </div>

            <p>
              <i>
                Если вам нужна другая категория измерений, 
                сначала <a href={'#' + ANCHOR_LINKS.STEP1_MEASURES}>выберите её в шаге №1</a>.
              </i>
            </p>

            <hr />

            <h3>Результат расчётов:</h3>

            <TextareaOutput name="ingredients" group="out" />

            <Note name="summary" group="out" />
          </section>
        </LocalStoreProvider>
      </ErrorBoundary>
    </div>
  );
}
