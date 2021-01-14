const constants = require('../constants');


module.exports = class Constant {

  static get TABLE_ROLE_PROGRAM_MAP() {
    return 'tb_role_program_map';
  }

  static get TABLE_VENDOR_SCORE() {
    return 'tb_vendor_scores';
  }

  static get TABLE_ROLE_MILESTONE_MAP() {
    return 'tb_role_milestone_map';
  }

  static get TABLE_ROLE_PROJECT_MILESTONE_MAP() {
    return 'tb_role_project_milestone_map';
  }

  static get TABLE_PROGRAM_MILESTONE() {
    return 'tb_program_milestones';
  }

  static get TABLE_PROJECT_MILESTONE() {
    return 'tb_project_milestones';
  }

  static get TABLE_USER() {
    return 'tb_role_user';
  }

  static get TABLE_ROLE() {
    return 'tb_role';
  }

  static get TABLE_ROLE_EMAIL_TEMPLATE() {
    return 'tb_role_email_template';
  }

  static get TABLE_ROLE_CONTRACT_MILESTONE_MAP(){
    return 'tb_role_contract_milestone_map';
  }

  static get TABLE_PROGRAMS() {
    return 'tb_programs';
  }

  static get TABLE_PROJECT() {
    return 'tb_projects';
  }

  static get TABLE_ROLE_PROJECT_MAP() {
    return 'tb_role_project_map';
  }

  static get TABLE_CONTRACT_TEMPLATE() {
    return 'tb_contract_template';
  }

  static get TABLE_SITES() {
    return 'tb_sites';
  }

  static get TABLE_TICKETS() {
    return 'tb_tickets';
  }

  static get TABLE_TICKETS_CLONE() {
    return 'tb_tickets_clone';
  }

  static get TABLE_CONTRACT_ITEMS() {
    return 'tb_contract_items';
  }

  static get TABLE_CONTRACT_TICKET_ITEMS() {
    return 'tb_contract_ticket_items';
  }

  static get TABLE_GENERAL_ITEMS() {
    return 'tb_general_items';
  }

  static get TABLE_VENDOR() {
    return 'tb_users';
  }

  static get TABLE_PURCHASE_ITEMS() {
    return 'tb_purchase_items';
  }

  static get TABLE_TICKET_ITEMS() {
    return 'tb_ticket_items';
  }

  static get TABLE_TICKET_ITEMS_CLONE() {
    return 'tb_ticket_items_clone';
  }

  static get TABLE_COMPANIES() {
    return 'tb_companies';
  }

  static get TABLE_CREW() {
    return 'tb_crew_type';
  }

  static get TABLE_VENDOR_CREW() {
    return 'tb_vendor_crew_type_details';
  }

  static get TABLE_PURCHASE_ORDERS() {
    return 'tb_purchase_orders';
  }

  static get TABLE_CONTRACT_SLA() {
    return 'tb_contract_sla';
  }
  static get TABLE_TICKET_SLA() {
    return 'tb_ticket_sla';
  }
  static get TABLE_CONTRACT_TICKET_SLA() {
    return 'tb_contract_ticket_sla';
  }
  static get TABLE_CONTRACT_TICKET_SLA_CLONE() {
    return 'tb_contract_ticket_sla_clone';
  }

  static get TABLE_CONTRACT_PROGRAM_PROJECT_MILESTONE() {
    return 'tb_contract_program_project_milestones';
  }

  static get TABLE_TICKET_PROGRAM_PROJECT_MILESTONE() {
    return 'tb_ticket_program_project_milestones';
  }

  static get TABLE_TICKET_PROGRAM_PROJECT_MILESTONE_CLONE() {
    return 'tb_ticket_program_project_milestones_clone';
  }

  static get TABLE_TICKET_MILESTONES() {
    return 'tb_ticket_milestones';
  }

  static get TABLE_TICKET_MILESTONES_CLONE() {
    return 'tb_ticket_milestones_clone';
  }

  static get TABLE_CONTRACT_MILESTONES() {
    return 'tb_contract_milestones';
  }

  static get TABLE_CONTRACT_FORMULAE() {
    return 'tb_contract_formulae';
  }

  static get TABLE_TICKET_FORMULAE() {
    return 'tb_ticket_formulae';
  }

  static get TABLE_TICKET_FORMULAE_CLONE() {
    return 'tb_ticket_formulae_clone';
  }

  static get TABLE_TICKET_TRIGGERS() {
    return 'tb_ticket_triggers';
  }

  static get TABLE_TICKET_TRIGGERS_CLONE() {
    return 'tb_ticket_triggers_clone';
  }

  static get TABLE_CONTRACT_TRIGGERS() {
    return 'tb_contract_triggers';
  }

  static get TABLE_ROLE_TICKET_MILESTONE_MAP() {
    return 'tb_role_ticket_milestone_map';
  }

  static get TABLE_ROLE_TICKET_MILESTONE_MAP_CLONE() {
    return 'tb_role_ticket_milestone_map_clone';
  }

  static get TABLE_REJECTION_REASONS() {
    return 'tb_rejection_reasons';
  }

  static get TABLE_COMPANY_WEIGHTS() {
    return 'tb_company_weights';
  }

  static get SUCCESS_STRING() {
    return 'Successful';
  }

  static get FAILURE_STRING() {
    return 'Failed';
  }

  static get STEP_NUMBER_4() {
    return 4;
  }

  static get STEP_NUMBER_2() {
    return 2;
  }

  static get TABLE_REGION() {
    return 'tb_region';
  }

  static get TABLE_MARKETS() {
    return 'tb_markets';
  }

  static get TABLE_BID_ZONES() {
    return 'tb_bid_zones';
  }

  static get TABLE_CONTACTS() {
    return 'tb_contacts';
  }

  static get TABLE_SITES_CONTACTS() {
    return 'tb_sites_contacts';
  }

  static get TABLE_VENDOR_MICRO() {
    return 'tb_vendor_micro';
  }

  static get TABLE_VENDOR_CREW_TYPE_DETAILS() {
    return 'tb_vendor_crew_type_details';
  }

  static get TABLE_VARIATION_ITEMS() {
    return 'tb_variation_items';
  }

  static get TABLE_VARIATION_VENDORS() {
    return 'tb_variation_vendors';
  }

  static get TABLE_ROLE_TEMPLATE_MILESTONE_MAP(){
    return 'tb_role_template_milestone_map';
  }

  static get TABLE_MILESTONES(){
    return 'tb_milestones';
  }

  static get TABLE_MILESTONE_FORMULAE(){
    return 'tb_milestone_formulae';
  }

  static get TABLE_ROLE_CONTRACT_TEMPLATE_MILESTONE_MAP(){
    return 'tb_role_contract_template_milestone_map';
  }

  static get TABLE_CONTRACT_MILESTONE_TEMPLATE_MILESTONES(){
    return 'tb_contract_milestone_template_milestones';
  }

  static GET_PROGRAM_TABLE(table_name, program_id) {
    //console.log("TABLES_AVAILABLE ", constants.TABLES_AVAILABLE);
    if(program_id && program_id > 0) {
      let table_program = `${table_name}_${program_id}`;
      // console.log(table_program,constants.TABLES_AVAILABLE.indexOf(table_program));
      if(constants.TABLES_AVAILABLE.indexOf(table_program) !== -1){
        return table_program;
      } else {
          return -1;
      }
    } else {
      return table_name;
    }
  }

    static GET_PROGRAM_TABLE_NAME(table_name, program_id) {
        if(program_id && program_id > 0) {
            let table_program = `${table_name}_${program_id}`;
            return table_program;
        } else {
            return -1;
        }
    }
};
