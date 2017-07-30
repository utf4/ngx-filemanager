import { NgxFilemanagerPage } from './app.po';

describe('ngx-filemanager App', () => {
  let page: NgxFilemanagerPage;

  beforeEach(() => {
    page = new NgxFilemanagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
