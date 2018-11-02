import { DdionrailsElasticsearchPage } from './app.po';

describe('ddionrails-elasticsearch App', () => {
  let page: DdionrailsElasticsearchPage;

  beforeEach(() => {
    page = new DdionrailsElasticsearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
