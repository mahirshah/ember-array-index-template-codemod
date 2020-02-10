# ember-array-index-template-codemod


## Usage

```
npx ember-array-index-template-codemod ember-array-index-template-codemod path/of/files/ or/some**/*glob.js

# or

yarn global add ember-array-index-template-codemod
ember-array-index-template-codemod ember-array-index-template-codemod path/of/files/ or/some**/*glob.js
```

## Input / Output

Generally, this codemod looks for all instances of the form `foo.[0]` in templates
and transforms them to be of the form `get foo "0"`

<!--FIXTURES_TOC_START-->
* [angle-brackets-with-block-params](#angle-brackets-with-block-params)
* [angle-brackets-with-hash-params](#angle-brackets-with-hash-params)
* [angle-brackets-without-params](#angle-brackets-without-params)
* [batman](#batman)
* [built-in-helpers](#built-in-helpers)
* [comments](#comments)
* [handlebars-with-block-params](#handlebars-with-block-params)
* [handlebars-with-hash-params](#handlebars-with-hash-params)
* [handlebars-with-positional-params](#handlebars-with-positional-params)
* [handlebars-with-wall-street-syntax](#handlebars-with-wall-street-syntax)
* [handlebars-without-params](#handlebars-without-params)
* [has-block](#has-block)
* [paths](#paths)
* [void-elements](#void-elements)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="angle-brackets-with-block-params">**angle-brackets-with-block-params**</a>

**Input** (<small>[angle-brackets-with-block-params.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/angle-brackets-with-block-params.input.hbs)</small>):
```hbs
<SomeComponent as |foo hash components|>
  {{foo.0.prop}}
  {{hash.property}}

  <components.foo0 as |property|>
    {{property}}
  </components.foo0>

  <components.bar/>

</SomeComponent>

```

**Output** (<small>[angle-brackets-with-block-params.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/angle-brackets-with-block-params.output.hbs)</small>):
```hbs
<SomeComponent as |foo hash components|>
  {{get foo "0.prop"}}
  {{hash.property}}

  <components.foo0 as |property|>
    {{property}}
  </components.foo0>

  <components.bar/>

</SomeComponent>

```
---
<a id="angle-brackets-with-hash-params">**angle-brackets-with-hash-params**</a>

**Input** (<small>[angle-brackets-with-hash-params.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/angle-brackets-with-hash-params.input.hbs)</small>):
```hbs
<a href='invalid-url' disabled></a>
<input value="something">

<SomeComponent @arg="value"/>
<SomeComponent @arg=1/>
<SomeComponent @arg=foo/>
<SomeComponent @arg={{foo.0.prop}} @bar={{property}} />
<MyAddon$MyComponent @arg={{foo.0.prop}} @bar={{property}} />
<MyAddon$Namespace::MyComponent @arg={{foo.0.prop}} @bar={{property}} />
<SomeComponent @arg={{foo.0.prop}} @bar={{fn myAction}} />
<Select
    data-test-select
    @items={{foo.0.prop}}
    @onSelectItem={{action "setValue"}}
    @selectedValue={{foo}}
/>

```

**Output** (<small>[angle-brackets-with-hash-params.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/angle-brackets-with-hash-params.output.hbs)</small>):
```hbs
<a href='invalid-url' disabled></a>
<input value="something">

<SomeComponent @arg="value"/>
<SomeComponent @arg=1/>
<SomeComponent @arg=foo/>
<SomeComponent @arg={{get foo "0.prop"}} @bar={{property}} />
<MyAddon$MyComponent @arg={{get foo "0.prop"}} @bar={{property}} />
<MyAddon$Namespace::MyComponent @arg={{get foo "0.prop"}} @bar={{property}} />
<SomeComponent @arg={{get foo "0.prop"}} @bar={{fn myAction}} />
<Select
    data-test-select
    @items={{get foo "0.prop"}}
    @onSelectItem={{action "setValue"}}
    @selectedValue={{foo}}
/>

```
---
<a id="angle-brackets-without-params">**angle-brackets-without-params**</a>

**Input** (<small>[angle-brackets-without-params.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/angle-brackets-without-params.input.hbs)</small>):
```hbs
<a></a>
<br>
<br />
<foo />
<foo></foo>
<Foo />
<Foo></Foo>

```

**Output** (<small>[angle-brackets-without-params.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/angle-brackets-without-params.output.hbs)</small>):
```hbs
<a></a>
<br>
<br />
<foo />
<foo></foo>
<Foo />
<Foo></Foo>

```
---
<a id="batman">**batman**</a>

**Input** (<small>[batman.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/batman.input.hbs)</small>):
```hbs
{{addon-name$helper-name}}
{{addon-name$component-name}}
<AddonName$ComponentName />
<AddonName$SomeFolderName::ComponentName />

```

**Output** (<small>[batman.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/batman.output.hbs)</small>):
```hbs
{{addon-name$helper-name}}
{{addon-name$component-name}}
<AddonName$ComponentName />
<AddonName$SomeFolderName::ComponentName />

```
---
<a id="built-in-helpers">**built-in-helpers**</a>

**Input** (<small>[built-in-helpers.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/built-in-helpers.input.hbs)</small>):
```hbs
{{debugger}}
{{has-block}}
{{hasBlock}}
{{input}}
{{outlet}}
{{textarea}}
{{yield}}

{{#let (concat "a" "b") as |ab|}}
  {{ab}}
{{/let}}

{{#each records.12.prop as |record|}}
  {{record.property}}
{{/each}}


<button {{on 'click' myAction}}>Action</button>
<button {{on 'click' (fn myAction foo)}}>Action</button>

{{link-to 'name' 'route'}}

```

**Output** (<small>[built-in-helpers.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/built-in-helpers.output.hbs)</small>):
```hbs
{{debugger}}
{{has-block}}
{{hasBlock}}
{{input}}
{{outlet}}
{{textarea}}
{{yield}}

{{#let (concat "a" "b") as |ab|}}
  {{ab}}
{{/let}}

{{#each (get records "12.prop") as |record|}}
  {{record.property}}
{{/each}}


<button {{on 'click' myAction}}>Action</button>
<button {{on 'click' (fn myAction foo)}}>Action</button>

{{link-to 'name' 'route'}}

```
---
<a id="comments">**comments**</a>

**Input** (<small>[comments.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/comments.input.hbs)</small>):
```hbs
<!-- foo -->
<div {{!-- foo --}}></div>
<div>{{!-- foo bar --}}<b></b></div>
{{!-- {{foo-bar}} --}}

```

**Output** (<small>[comments.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/comments.output.hbs)</small>):
```hbs
<!-- foo -->
<div {{!-- foo --}}></div>
<div>{{!-- foo bar --}}<b></b></div>
{{!-- {{foo-bar}} --}}

```
---
<a id="handlebars-with-block-params">**handlebars-with-block-params**</a>

**Input** (<small>[handlebars-with-block-params.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/handlebars-with-block-params.input.hbs)</small>):
```hbs
{{#my-component as |foo myAction hash components|}}
  {{foo.0.prop}} {{myAction}}
  {{hash.property}} {{hash.foo}}

  {{components.foo}}

  {{#components.my-component}}

  {{/components.my-component}}

  {{#components.block as |block|}}
    {{block}}
  {{/components.block}}
{{/my-component}}


```

**Output** (<small>[handlebars-with-block-params.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/handlebars-with-block-params.output.hbs)</small>):
```hbs
{{#my-component as |foo myAction hash components|}}
  {{get foo "0.prop"}} {{myAction}}
  {{hash.property}} {{hash.foo}}

  {{components.foo}}

  {{#components.my-component}}

  {{/components.my-component}}

  {{#components.block as |block|}}
    {{block}}
  {{/components.block}}
{{/my-component}}


```
---
<a id="handlebars-with-hash-params">**handlebars-with-hash-params**</a>

**Input** (<small>[handlebars-with-hash-params.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/handlebars-with-hash-params.input.hbs)</small>):
```hbs
{{my-component arg="string"}}
{{my-component arg=2}}
{{my-component arg=foo.0.prop}}
{{my-component arg=property}}
{{my-component arg=(my-helper foo.0.prop)}}
{{my-component arg=(my-helper (fn myAction property) foo.0.prop)}}
{{my-component arg=property arg2=foo.0.prop}}
{{my-component arg=property arg2=(fn myAction foo.0.prop)}}


```

**Output** (<small>[handlebars-with-hash-params.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/handlebars-with-hash-params.output.hbs)</small>):
```hbs
{{my-component arg="string"}}
{{my-component arg=2}}
{{my-component arg=(get foo "0.prop")}}
{{my-component arg=property}}
{{my-component arg=(my-helper (get foo "0.prop"))}}
{{my-component arg=(my-helper (fn myAction property) (get foo "0.prop"))}}
{{my-component arg=property arg2=(get foo "0.prop")}}
{{my-component arg=property arg2=(fn myAction (get foo "0.prop"))}}


```
---
<a id="handlebars-with-positional-params">**handlebars-with-positional-params**</a>

**Input** (<small>[handlebars-with-positional-params.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/handlebars-with-positional-params.input.hbs)</small>):
```hbs
{{my-component "string"}}
{{my-component 1}}
{{my-component foo.0.prop}}
{{my-component @foo}}
{{my-component property}}
{{my-component (my-helper foo.0.prop)}}
{{my-component (my-helper "string")}}
{{my-component (my-helper 1)}}
{{get this 'key'}}


```

**Output** (<small>[handlebars-with-positional-params.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/handlebars-with-positional-params.output.hbs)</small>):
```hbs
{{my-component "string"}}
{{my-component 1}}
{{my-component (get foo "0.prop")}}
{{my-component @foo}}
{{my-component property}}
{{my-component (my-helper (get foo "0.prop"))}}
{{my-component (my-helper "string")}}
{{my-component (my-helper 1)}}
{{get this 'key'}}


```
---
<a id="handlebars-with-wall-street-syntax">**handlebars-with-wall-street-syntax**</a>

**Input** (<small>[handlebars-with-wall-street-syntax.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/handlebars-with-wall-street-syntax.input.hbs)</small>):
```hbs
{{my-addon$my-component foo}}
{{my-addon$namespace::my-component @foo}}
{{my-addon$namespace::my-component foo.0.prop}}
{{my-addon$my-component (my-helper foo.0.prop)}}
{{my-addon$my-component (my-helper "string")}}
{{my-addon$namespace::my-component (my-helper 1)}}

```

**Output** (<small>[handlebars-with-wall-street-syntax.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/handlebars-with-wall-street-syntax.output.hbs)</small>):
```hbs
{{my-addon$my-component foo}}
{{my-addon$namespace::my-component @foo}}
{{my-addon$namespace::my-component (get foo "0.prop")}}
{{my-addon$my-component (my-helper (get foo "0.prop"))}}
{{my-addon$my-component (my-helper "string")}}
{{my-addon$namespace::my-component (my-helper 1)}}

```
---
<a id="handlebars-without-params">**handlebars-without-params**</a>

**Input** (<small>[handlebars-without-params.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/handlebars-without-params.input.hbs)</small>):
```hbs
{{my-component}}
{{a-helper0}}
{{foo}}
{{property}}
{{namespace/foo0}}
{{someGetter}}

```

**Output** (<small>[handlebars-without-params.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/handlebars-without-params.output.hbs)</small>):
```hbs
{{my-component}}
{{a-helper0}}
{{foo}}
{{property}}
{{namespace/foo0}}
{{someGetter}}

```
---
<a id="has-block">**has-block**</a>

**Input** (<small>[has-block.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/has-block.input.hbs)</small>):
```hbs
{{if hasBlock "block"}}
{{#if hasBlock}}block{{/if}}
{{if (has-block) "block"}}
{{#if (has-block)}}block{{/if}}
{{if (has-block "main") "block"}}
{{#if (has-block "main")}}block{{/if}}
{{if (has-block-params "main") "block"}}
{{#if (has-block-params "main")}}block{{/if}}

```

**Output** (<small>[has-block.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/has-block.output.hbs)</small>):
```hbs
{{if hasBlock "block"}}
{{#if hasBlock}}block{{/if}}
{{if (has-block) "block"}}
{{#if (has-block)}}block{{/if}}
{{if (has-block "main") "block"}}
{{#if (has-block "main")}}block{{/if}}
{{if (has-block-params "main") "block"}}
{{#if (has-block-params "main")}}block{{/if}}

```
---
<a id="paths">**paths**</a>

**Input** (<small>[paths.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/paths.input.hbs)</small>):
```hbs
{{foo-bar-baz}}
{{baz}}
{{baz.prop.0.foo}}
{{baz.0.0.0.foo}}
{{baz.123.0.0.foo}}
{{baz123.foo}}

```

**Output** (<small>[paths.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/paths.output.hbs)</small>):
```hbs
{{foo-bar-baz}}
{{baz}}
{{get baz.prop "0.foo"}}
{{get baz "0.0.0.foo"}}
{{get baz "123.0.0.foo"}}
{{baz123.foo}}

```
---
<a id="void-elements">**void-elements**</a>

**Input** (<small>[void-elements.input.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/void-elements.input.hbs)</small>):
```hbs
<img
    id="Preview"
    src="{{previewImageUrl.0.url}}"
    class="image"
>

```

**Output** (<small>[void-elements.output.hbs](transforms/ember-array-index-template-codemod/__testfixtures__/void-elements.output.hbs)</small>):
```hbs
<img
    id="Preview"
    src="{{get previewImageUrl "0.url"}}"
    class="image"
>

```
<!--FIXTURES_CONTENT_END-->
