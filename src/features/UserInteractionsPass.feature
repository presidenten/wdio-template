Feature: User interactions

  Background:
    Given I navigate to base url

  Scenario: I should be able to edit input (should pass)
    Given I open Basic Examples tab
    And I open 'basic-first-form' demo
    When I enter message 'President'
    And I click 'Show Message'
    Then My message 'President' should be displayed
