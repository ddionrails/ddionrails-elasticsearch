import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { SearchBarComponent } from './searchBar/searchBar.component';
import { EsService } from './search/es.service';
import { ResponseService } from './search/response.service';
import { SearchService } from './search/search.service';
import { ContentComponent } from './content/content.component';
import { FilterComponent } from './filter/filter.component';
import { FillArrayPipe } from './results/fillArray.pipe';
import { AutocompleteService } from './autocomplete/autocomplete.service';
import { VariableComponent } from './content/variable/variable.component';
import { PublicationComponent } from './content/publication/publication.component';
import { ConceptComponent } from './content/concept/concept.component';
import { QuestionComponent } from './content/question/question.component';


@NgModule({
  declarations: [
    AppComponent,
	  ResultsComponent,
	  SearchBarComponent,
	  ContentComponent,
	  FilterComponent,
    FillArrayPipe,
    VariableComponent,
    PublicationComponent,
    ConceptComponent,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	  JsonpModule,
  ],
  providers: [SearchService, ResponseService, EsService, AutocompleteService],
  bootstrap: [AppComponent]
})


export class AppModule { }
