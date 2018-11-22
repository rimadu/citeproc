export default `<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="sort-only" default-locale="en-US">
  <info>
    <title>Acta Naturae</title>
    <id>http://www.zotero.org/styles/acta-naturae</id>
    <link href="http://www.zotero.org/styles/acta-naturae" rel="self"/>
    <link href="http://www.zotero.org/styles/vancouver" rel="template"/>
    <link href="http://actanaturae.ru/" rel="documentation"/>
    <author>
      <name>Dmitrijs Lvovs</name>
      <email>dmitrijs.lvovs@gmail.com</email>
    </author>
    <contributor>
      <name>Alexander Favorov</name>
      <email>favorov@sensi.org</email>
    </contributor>
    <category citation-format="numeric"/>
    <category field="biology"/>
    <issn>2075-8251</issn>
    <summary>Style for Acta Naturae journal</summary>
    <updated>2017-07-03T03:48:18+00:00</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <macro name="author">
    <names variable="author" suffix=". ">
      <name sort-separator=" " initialize-with="." name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
      <label form="short" prefix=", "/>
      <substitute>
        <names variable="editor"/>
      </substitute>
    </names>
  </macro>
  <macro name="editor">
    <names variable="editor" suffix=". ">
      <name sort-separator=" " initialize-with="." name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
      <label form="short" prefix=", "/>
    </names>
  </macro>
  <macro name="publisher">
    <text variable="publisher-place" suffix=". "/>
    <text variable="publisher" suffix=". "/>
    <group>
      <date variable="issued">
        <date-part name="year"/>
      </date>
      <text macro="accessed-date" prefix=" "/>
    </group>
  </macro>
  <macro name="access">
    <group>
      <text variable="URL"/>
    </group>
  </macro>
  <macro name="accessed-date">
    <choose>
      <if variable="URL">
        <group prefix="(" suffix=")" delimiter=" ">
          <text term="accessed" text-case="capitalize-first"/>
          <date variable="accessed" prefix=" ">
            <date-part name="month"/>
            <date-part name="day" prefix=" "/>
            <date-part name="year" prefix=", "/>
          </date>
        </group>
      </if>
    </choose>
  </macro>
  <macro name="journal-title">
    <choose>
      <if type="article-journal article-magazine" match="any">
        <group suffix=". ">
          <text variable="container-title" form="short"/>
        </group>
      </if>
      <else>
        <text variable="container-title" suffix=". " form="short"/>
      </else>
    </choose>
  </macro>
  <macro name="title">
    <group delimiter=" ">
      <text variable="title"/>
      <choose>
        <if type="thesis">
          <text variable="genre" prefix="[" suffix="]"/>
        </if>
      </choose>
    </group>
  </macro>
  <macro name="edition">
    <choose>
      <if is-numeric="edition">
        <group delimiter=" ">
          <number variable="edition" form="ordinal"/>
          <text term="edition" form="short"/>
        </group>
      </if>
      <else>
        <text variable="edition" suffix="."/>
      </else>
    </choose>
  </macro>
  <citation collapse="citation-number">
    <sort>
      <key variable="citation-number"/>
    </sort>
    <layout prefix="[" suffix="]" delimiter=",">
      <text variable="citation-number"/>
      <group prefix=", ">
        <label variable="locator" form="short"/>
        <text variable="locator"/>
      </group>
    </layout>
  </citation>
  <bibliography et-al-min="11" et-al-use-first="10" second-field-align="flush">
    <layout>
      <text variable="citation-number" suffix=". "/>
      <text macro="author"/>
      <choose>
        <if type="bill book thesis graphic legal_case motion_picture report song" match="any">
          <text macro="edition" prefix=" " suffix=" "/>
          <group suffix=".">
            <text macro="title" suffix="."/>
            <text macro="publisher" prefix=" // "/>
            <text variable="number-of-pages" suffix=" p." prefix=". "/>
          </group>
        </if>
        <else-if type="chapter paper-conference" match="any">
          <group prefix=" " suffix=". ">
            <text term="in" suffix=": " text-case="capitalize-first"/>
            <text macro="editor"/>
            <text variable="container-title"/>
          </group>
          <text macro="publisher" prefix=" // "/>
          <text variable="page" prefix=". " suffix="."/>
        </else-if>
        <else>
          <text macro="journal-title" prefix="// "/>
          <group suffix=". ">
            <date variable="issued">
              <date-part name="year"/>
            </date>
          </group>
          <group suffix=".">
            <text variable="volume" prefix="V. " suffix=". "/>
            <text variable="issue" prefix="№ " suffix=". "/>
            <text variable="page" prefix="P. "/>
          </group>
        </else>
      </choose>
      <text macro="access"/>
      <text macro="accessed-date" prefix=". "/>
    </layout>
  </bibliography>
</style>
`;
